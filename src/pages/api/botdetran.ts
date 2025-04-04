import { NextApiRequest, NextApiResponse } from "next"; // 🔹 Importando os tipos do Next.js
import puppeteer from "puppeteer";
import Tesseract from "tesseract.js"; // 🔹 OCR para leitura de imagens
import fs from "fs"; // 🔹 Manipulação de arquivos
import path from "path"; // 🔹 Gerenciamento de caminhos

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "Método não permitido. Use POST." });
    }

    try {
        console.log("🚀 Iniciando automação...");

        // Inicia o Puppeteer
        const browser = await puppeteer.launch({
            headless: false, // 🔹 Alterar para `true` se quiser rodar em background
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();

        // **Acessando o site**
        await page.goto("https://sistema.detrannet.sc.gov.br/arearestrita/tela_principal.asp", { waitUntil: "networkidle2" });

        console.log("✅ Site acessado. Realizando login...");

        // **Preenche login e senha manualmente**
        await page.type('input[name="usuario"]', "09799529999", { delay: 100 });
        await page.type('input[name="senha"]', "20022022", { delay: 100 });
        await page.click('button[type="submit"]'); // 🔹 Ajuste se o botão for diferente

        await page.waitForNavigation({ waitUntil: "networkidle2" });

        console.log("✅ Login realizado com sucesso!");

        // **Captura um screenshot da página**
        const screenshotPath = path.resolve("public/screenshot.png");
        await page.screenshot({ path: screenshotPath });

        // **Processa a imagem com OCR para encontrar o texto "Veículos"**
        console.log("🔍 Processando OCR...");
        const { data: { text } } = await Tesseract.recognize(screenshotPath, "por");

        console.log("📄 Texto encontrado na página:", text);

        let buttonFound = false;

        if (text.includes("Veículos")) {
            console.log("✅ Botão 'Veículos' identificado via OCR!");
        } else {
            console.log("❌ OCR não encontrou o botão 'Veículos'. Tentando via DOM...");
        }

        // **Tenta clicar no botão "Veículos" no DOM**
        buttonFound = await page.evaluate(() => {
            const button = Array.from(document.querySelectorAll("a, button, span"))
                .find(el => (el as HTMLElement).innerText.includes("Veículos"));
        
            if (button) {
                (button as HTMLElement).click();
                return true;
            }
            return false;
        });

        if (buttonFound) {
            console.log("✅ Clique realizado no botão 'Veículos'!");
        } else {
            console.log("❌ Botão 'Veículos' não encontrado no DOM. Tentando no iframe...");
        }

        // **Verifica se há frames na página**
        const frames = await page.frames();
        console.log(`🔍 Foram encontrados ${frames.length} iframes.`);

        const menuFrame = frames.find(f => f.name() === "contents");

        if (!menuFrame) {
            throw new Error("❌ Frame de navegação não encontrado.");
        }

        console.log("✅ Acessou o iframe do menu!");

        // **Tenta encontrar e clicar no botão "Veículos" dentro do iframe**
        buttonFound = await menuFrame.evaluate(() => {
            const buttons = Array.from(document.querySelectorAll("a, button, span"));
            
            for (const btn of buttons) {
                const buttonElement = btn as HTMLElement;
                if (buttonElement.innerText.includes("Veículos")) {
                    buttonElement.click();
                    return true;
                }
            }
            return false;
        });
        

        if (buttonFound) {
            console.log("✅ Clique realizado no botão 'Veículos' dentro do iframe!");
        } else {
            console.log("❌ O botão 'Veículos' não foi encontrado dentro do iframe.");
        }

        console.log("📋 Acessando formulário de Intenção de Venda...");

        // **Fecha o navegador**
      

        res.status(200).json({ message: "Automação concluída com sucesso!" });
    } catch (error) {
        console.error("❌ Erro na automação:", error);
        res.status(500).json({ error: `Erro interno: ${(error as Error).message}` });
    }
}
