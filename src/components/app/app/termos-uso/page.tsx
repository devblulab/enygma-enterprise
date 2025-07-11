import Link from "next/link"
import { ArrowLeft, Scale, FileText, AlertTriangle, CheckCircle, Users, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Logo } from "@/components/logo"
import { AnimatedSection } from "@/components/animated-section"

export const metadata = {
  title: "Termos de Uso - Gustavo Martins",
  description: "Termos de Uso e condições para utilização dos serviços de automação e IA do Gustavo Martins",
}

export default function TermosUso() {
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
                <Scale className="w-8 h-8 text-brand-purple mr-3" />
                <h1 className="text-4xl md:text-5xl font-bold text-white font-charis">Termos de Uso</h1>
              </div>
              <p className="text-xl text-brand-gray-light font-sora">Condições para utilização dos nossos serviços</p>
              <p className="text-sm text-brand-gray mt-2">Última atualização: Janeiro de 2025</p>
            </div>
          </AnimatedSection>

          <div className="space-y-12">
            <AnimatedSection animation="fade-up" delay={200}>
              <div className="bg-brand-black-medium/50 rounded-2xl p-8 border border-brand-purple/20">
                <div className="flex items-center mb-6">
                  <FileText className="w-6 h-6 text-brand-purple mr-3" />
                  <h2 className="text-2xl font-bold text-white font-charis">1. Aceitação dos Termos</h2>
                </div>
                <p className="text-brand-gray-light leading-relaxed font-sora">
                  Ao acessar e utilizar este site ou contratar nossos serviços de automação e inteligência artificial,
                  você concorda em cumprir e estar vinculado a estes Termos de Uso. Se você não concordar com qualquer
                  parte destes termos, não deve utilizar nossos serviços.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={300}>
              <div className="bg-brand-black-medium/50 rounded-2xl p-8 border border-brand-accent-blue/20">
                <div className="flex items-center mb-6">
                  <CheckCircle className="w-6 h-6 text-brand-accent-blue mr-3" />
                  <h2 className="text-2xl font-bold text-white font-charis">2. Descrição dos Serviços</h2>
                </div>
                <p className="text-brand-gray-light leading-relaxed mb-6 font-sora">
                  Oferecemos serviços especializados em:
                </p>
                <div className="grid md:grid-cols-2 gap-6">
                  <ul className="space-y-4 text-brand-gray-light font-sora">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-brand-accent-blue rounded-full mt-2 mr-3 flex-shrink-0" />
                      <div>
                        <strong className="text-brand-white">Desenvolvimento de Chatbots:</strong> Criação de
                        assistentes virtuais inteligentes
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-brand-accent-blue rounded-full mt-2 mr-3 flex-shrink-0" />
                      <div>
                        <strong className="text-brand-white">Automação de Processos (RPA):</strong> Automatização de
                        workflows empresariais
                      </div>
                    </li>
                  </ul>
                  <ul className="space-y-4 text-brand-gray-light font-sora">
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-brand-accent-blue rounded-full mt-2 mr-3 flex-shrink-0" />
                      <div>
                        <strong className="text-brand-white">Soluções de IA:</strong> Implementação de inteligência
                        artificial personalizada
                      </div>
                    </li>
                    <li className="flex items-start">
                      <div className="w-2 h-2 bg-brand-accent-blue rounded-full mt-2 mr-3 flex-shrink-0" />
                      <div>
                        <strong className="text-brand-white">Sites & Landing Pages:</strong> Desenvolvimento web
                        profissional
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={400}>
              <div className="bg-brand-black-medium/50 rounded-2xl p-8 border border-brand-accent-pink/20">
                <div className="flex items-center mb-6">
                  <Users className="w-6 h-6 text-brand-accent-pink mr-3" />
                  <h2 className="text-2xl font-bold text-white font-charis">3. Responsabilidades do Cliente</h2>
                </div>
                <p className="text-brand-gray-light leading-relaxed mb-6 font-sora">
                  Ao contratar nossos serviços, você se compromete a:
                </p>
                <ul className="space-y-4 text-brand-gray-light font-sora">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-brand-accent-pink rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>Fornecer informações precisas e atualizadas sobre suas necessidades</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-brand-accent-pink rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>Colaborar ativamente no desenvolvimento das soluções</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-brand-accent-pink rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>Realizar pagamentos conforme acordado nos contratos</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-brand-accent-pink rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>Utilizar as soluções desenvolvidas de forma ética e legal</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-brand-accent-pink rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>Manter a confidencialidade de informações técnicas compartilhadas</span>
                  </li>
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={500}>
              <div className="bg-brand-black-medium/50 rounded-2xl p-8 border border-brand-purple/20">
                <div className="flex items-center mb-6">
                  <Shield className="w-6 h-6 text-brand-purple mr-3" />
                  <h2 className="text-2xl font-bold text-white font-charis">4. Propriedade Intelectual</h2>
                </div>
                <div className="space-y-4 text-brand-gray-light font-sora">
                  <p className="leading-relaxed">
                    Todo o conteúdo deste site, incluindo textos, gráficos, logos, ícones, imagens, clipes de áudio,
                    downloads digitais e software, é propriedade de{" "}
                    <span className="text-brand-white font-charis">Gustavo Martins</span> ou de seus fornecedores de
                    conteúdo e está protegido pelas leis de direitos autorais.
                  </p>
                  <p className="leading-relaxed">
                    As soluções desenvolvidas sob contrato específico terão os direitos de propriedade definidos no
                    respectivo acordo comercial.
                  </p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={600}>
              <div className="bg-brand-black-medium/50 rounded-2xl p-8 border border-brand-accent-blue/20">
                <div className="flex items-center mb-6">
                  <AlertTriangle className="w-6 h-6 text-brand-purple mr-3" />
                  <h2 className="text-2xl font-bold text-white font-charis">5. Limitação de Responsabilidade</h2>
                </div>
                <p className="text-brand-gray-light leading-relaxed mb-6 font-sora">
                  Nossos serviços são fornecidos "como estão". Embora nos esforcemos para garantir a qualidade e
                  eficiência de nossas soluções:
                </p>
                <ul className="space-y-4 text-brand-gray-light font-sora">
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-brand-purple rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>Não garantimos que os serviços atenderão a todas as suas expectativas específicas</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-brand-purple rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>Não somos responsáveis por danos indiretos ou consequenciais</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-brand-purple rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>Nossa responsabilidade é limitada ao valor pago pelos serviços</span>
                  </li>
                  <li className="flex items-start">
                    <div className="w-2 h-2 bg-brand-purple rounded-full mt-2 mr-3 flex-shrink-0" />
                    <span>Recomendamos testes adequados antes da implementação em produção</span>
                  </li>
                </ul>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={700}>
              <div className="bg-brand-black-medium/50 rounded-2xl p-8 border border-brand-purple/20">
                <div className="flex items-center mb-6">
                  <Scale className="w-6 h-6 text-brand-purple mr-3" />
                  <h2 className="text-2xl font-bold text-white font-charis">6. Lei Aplicável</h2>
                </div>
                <p className="text-brand-gray-light leading-relaxed font-sora">
                  Estes Termos de Uso são regidos pelas leis brasileiras. Qualquer disputa será resolvida no foro da
                  comarca de Itanhaém, SP, ou através de mediação e arbitragem, conforme acordado entre as partes.
                </p>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="fade-up" delay={800}>
              <div className="bg-brand-black-medium/50 rounded-2xl p-8 border border-brand-accent-blue/20">
                <div className="flex items-center mb-6">
                  <FileText className="w-6 h-6 text-brand-accent-blue mr-3" />
                  <h2 className="text-2xl font-bold text-white font-charis">7. Contato</h2>
                </div>
                <p className="text-brand-gray-light leading-relaxed mb-6 font-sora">
                  Para dúvidas sobre estes Termos de Uso ou questões relacionadas aos nossos serviços:
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
