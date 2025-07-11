import Link from "next/link"
import { ArrowLeft, Shield, Eye, Lock, UserCheck, FileText, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { AnimatedSection } from "@/components/animated-section"

export const metadata = {
  title: "Política de Privacidade - Gustavo Martins",
  description: "Política de Privacidade e proteção de dados pessoais do site Gustavo Martins - Transforme seu Tempo",
}

export default function PoliticaPrivacidade() {
  return (
    <div className="min-h-screen bg-brand-black text-brand-white">
      {/* Background Pattern */}
      <div className="fixed inset-0 triangle-pattern opacity-20" />
      <div className="fixed inset-0 bg-gradient-to-br from-brand-purple/5 via-transparent to-brand-accent-blue/5" />

      {/* Header */}
      <header className="relative z-50 border-b border-brand-gray-dark/20 bg-brand-black/90 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12 py-6">
          <div className="flex items-center justify-between">
            <Logo size="md" />
            <Button
              asChild
              variant="outline"
              className="border-brand-purple/50 text-brand-purple hover:bg-brand-purple hover:text-white transition-all duration-300"
            >
              <Link href="/">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Voltar ao Site
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="relative z-10 py-16">
        <div className="max-w-4xl mx-auto px-6 md:px-8 lg:px-12">
          <AnimatedSection animation="fade-up">
            <div className="text-center mb-16">
              <div className="flex items-center justify-center mb-6">
                <Shield className="w-8 h-8 text-brand-purple mr-3" />
                <h1 className="text-4xl md:text-5xl font-bold text-white font-charis">Política de Privacidade</h1>
              </div>
              <p className="text-xl text-brand-gray-light font-sora">
                Transparência e proteção dos seus dados pessoais
              </p>
              <p className="text-sm text-brand-gray mt-2">Última atualização: Janeiro de 2025</p>
            </div>
          </AnimatedSection>

          <div className="space-y-12">
            <AnimatedSection animation="fade-up" delay={200}>
              <div className="bg-brand-black-medium/50 rounded-2xl p-8 border border-brand-purple/20">
                <div className="flex items-center mb-6">
                  <Eye className="w-6 h-6 text-brand-purple mr-3" />
                  <h2 className="text-2xl font-bold text-white font-charis">1. Informações que Coletamos</h2>
                </div>
                <p className="text-brand-gray-light leading-relaxed mb-6 font-sora">
                  Coletamos apenas as informações necessárias para fornecer nossos serviços de automação e IA:
                </p>
                <ul className="space-y-4 text-brand-gray-light font-sora">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-brand-purple rounded-full mt-2 mr-3 flex-shrink-0" />
                    <div>
                      <strong className="text-brand-white">Dados de Contato:</strong> Nome, e-mail, telefone quando você
                      entra em contato conosco
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-brand-purple rounded-full mt-2 mr-3 flex-shrink-0" />
                    <div>
                      <strong className="text-brand-white">Dados de Navegação:</strong> Informações sobre como você usa
                      nosso site (cookies, IP, navegador)
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-brand-purple rounded-full mt-2 mr-3 flex-shrink-0" />
                    <div>
                      <strong className="text-brand-white">Dados de Comunicação:</strong> Conversas via WhatsApp, e-mail
                      ou outros canais de atendimento
                    </div>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-brand-purple rounded-full mt-2 mr-3 flex-shrink-0" />
                    <div>
                      <strong className="text-brand-white">Dados Profissionais:</strong> Informações sobre sua empresa e
                      necessidades de automação
                    </div>
                  </li>
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={300}>
              <div className="bg-brand-black-medium/50 rounded-2xl p-8 border border-brand-accent-blue/20">
                <div className="flex items-center mb-6">
                  <UserCheck className="w-6 h-6 text-brand-accent-blue mr-3" />
                  <h2 className="text-2xl font-bold text-white font-charis">2. Como Usamos suas Informações</h2>
                </div>
                <p className="text-brand-gray-light leading-relaxed mb-6 font-sora">
                  Utilizamos seus dados pessoais para:
                </p>
                <ul className="space-y-4 text-brand-gray-light font-sora">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-brand-accent-blue rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>Responder suas dúvidas e fornecer suporte técnico</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-brand-accent-blue rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>Desenvolver soluções de automação personalizadas</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-brand-accent-blue rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>Enviar propostas comerciais e orçamentos</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-brand-accent-blue rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>Melhorar nossos serviços e experiência do usuário</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-brand-accent-blue rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>Cumprir obrigações legais e contratuais</span>
                  </li>
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={400}>
              <div className="bg-brand-black-medium/50 rounded-2xl p-8 border border-brand-accent-pink/20">
                <div className="flex items-center mb-6">
                  <Lock className="w-6 h-6 text-brand-accent-pink mr-3" />
                  <h2 className="text-2xl font-bold text-white font-charis">3. Proteção e Segurança</h2>
                </div>
                <p className="text-brand-gray-light leading-relaxed mb-6 font-sora">
                  Implementamos medidas de segurança técnicas e organizacionais para proteger seus dados:
                </p>
                <ul className="space-y-4 text-brand-gray-light font-sora">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-brand-accent-pink rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>Criptografia SSL/TLS em todas as comunicações</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-brand-accent-pink rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>Acesso restrito aos dados apenas para funcionários autorizados</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-brand-accent-pink rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>Backups seguros e regulares</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-brand-accent-pink rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>Monitoramento contínuo de segurança</span>
                  </li>
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={500}>
              <div className="bg-brand-black-medium/50 rounded-2xl p-8 border border-brand-purple/20">
                <div className="flex items-center mb-6">
                  <FileText className="w-6 h-6 text-brand-purple mr-3" />
                  <h2 className="text-2xl font-bold text-white font-charis">4. Seus Direitos (LGPD)</h2>
                </div>
                <p className="text-brand-gray-light leading-relaxed mb-6 font-sora">
                  Conforme a Lei Geral de Proteção de Dados (LGPD), você tem direito a:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4 text-brand-gray-light font-sora">
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-brand-purple rounded-full mt-2 mr-3 flex-shrink-0" />
                      <div>
                        <strong className="text-brand-white">Acesso:</strong> Saber quais dados temos sobre você
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-brand-purple rounded-full mt-2 mr-3 flex-shrink-0" />
                      <div>
                        <strong className="text-brand-white">Correção:</strong> Corrigir dados incompletos ou incorretos
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-brand-purple rounded-full mt-2 mr-3 flex-shrink-0" />
                      <div>
                        <strong className="text-brand-white">Exclusão:</strong> Solicitar a remoção de seus dados
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4 text-brand-gray-light font-sora">
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-brand-purple rounded-full mt-2 mr-3 flex-shrink-0" />
                      <div>
                        <strong className="text-brand-white">Portabilidade:</strong> Receber seus dados em formato
                        estruturado
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-brand-purple rounded-full mt-2 mr-3 flex-shrink-0" />
                      <div>
                        <strong className="text-brand-white">Oposição:</strong> Se opor ao tratamento de seus dados
                      </div>
                    </div>
                    <div className="flex items-start">
                      <div className="w-2 h-2 bg-brand-purple rounded-full mt-2 mr-3 flex-shrink-0" />
                      <div>
                        <strong className="text-brand-white">Revogação:</strong> Retirar seu consentimento a qualquer
                        momento
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-brand-purple/10 rounded-lg border border-brand-purple/20">
                  <p className="text-brand-gray-light font-sora">
                    Para exercer seus direitos, entre em contato:{" "}
                    <strong className="text-brand-purple">enygna.enterprises@gmail.com</strong>
                  </p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={600}>
              <div className="bg-brand-black-medium/50 rounded-2xl p-8 border border-brand-accent-blue/20">
                <div className="flex items-center mb-6">
                  <AlertCircle className="w-6 h-6 text-brand-accent-blue mr-3" />
                  <h2 className="text-2xl font-bold text-white font-charis">5. Contato</h2>
                </div>
                <p className="text-brand-gray-light leading-relaxed mb-6 font-sora">
                  Para dúvidas sobre esta Política de Privacidade ou sobre o tratamento de seus dados pessoais:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-3 text-brand-gray-light font-sora">
                    <p>
                      <strong className="text-brand-white">Responsável:</strong>{" "}
                      <span className="font-charis">Gustavo Martins</span>
                    </p>
                    <p>
                      <strong className="text-brand-white">E-mail:</strong>{" "}
                      <span className="text-brand-purple">enygna.enterprises@gmail.com</span>
                    </p>
                  </div>
                  <div className="space-y-3 text-brand-gray-light font-sora">
                    <p>
                      <strong className="text-brand-white">WhatsApp:</strong>{" "}
                      <span className="text-brand-purple">+55 (48) 99945-0642</span>
                    </p>
                    <p>
                      <strong className="text-brand-white">Endereço:</strong> Itanhaém, SP - Brasil
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </main>
    </div>
  )
}
