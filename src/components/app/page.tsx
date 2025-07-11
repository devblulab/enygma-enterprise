"use client"

import { Button } from "../components/ui/button"
import { Card, CardContent } from "../components/ui/card"
import { Badge } from "../components/ui/badge"
import { Logo } from "../components/logo"
import { AnimatedSection } from "../components/animated-section"
import {
  Bot,
  Zap,
  Brain,
  Mail,
  Linkedin,
  Github,
  CheckCircle,
  Users,
  TrendingUp,
  Heart,
  Shield,
  Sparkles,
  Award,
  Globe,
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

import Icon from "../components/icon/icon"

export default function LandingPage() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-brand-black text-brand-white overflow-x-hidden">
      {/* Mobile-first Refined Background Pattern */}
      <div className="fixed inset-0 triangle-pattern opacity-30 md:opacity-40" />

      {/* Mobile-first Sophisticated Gradient Overlays */}
      <div className="fixed inset-0 bg-gradient-to-br from-brand-purple/2 via-transparent to-brand-accent-blue/2 md:from-brand-purple/3 md:to-brand-accent-blue/3" />
      <div className="fixed inset-0 bg-gradient-to-tr from-transparent via-brand-purple/1 to-transparent md:via-brand-purple/2" />

      {/* Mobile-first Elegant Floating Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-16 left-6 w-1 h-1 md:top-20 md:left-10 md:w-1.5 md:h-1.5 bg-brand-purple rounded-full animate-pulse opacity-40 md:opacity-60" />
        <div className="absolute top-32 right-12 w-0.5 h-0.5 md:top-40 md:right-20 md:w-1 md:h-1 bg-brand-accent-blue rounded-full animate-pulse delay-1000 opacity-30 md:opacity-40" />
        <div className="absolute bottom-32 left-12 w-1.5 h-1.5 md:bottom-40 md:left-20 md:w-2 md:h-2 bg-brand-accent-pink rounded-full animate-pulse delay-2000 opacity-40 md:opacity-50" />
        <div className="absolute bottom-16 right-6 w-1 h-1 md:bottom-20 md:right-10 md:w-1.5 md:h-1.5 bg-brand-purple rounded-full animate-pulse delay-3000 opacity-40 md:opacity-60" />

        {/* Mobile-first Refined Floating Triangles */}
        <div className="absolute top-1/4 left-1/4 text-brand-purple/10 md:text-brand-purple/15 animate-float">
          <svg className="w-4 h-4 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L22 20H2L12 2Z" />
          </svg>
        </div>
        <div className="absolute top-1/3 right-1/3 text-brand-accent-blue/10 md:text-brand-accent-blue/15 animate-float delay-1000">
          <svg className="w-3 h-3 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L22 20H2L12 2Z" />
          </svg>
        </div>
        <div className="absolute bottom-1/3 left-1/5 text-brand-accent-pink/10 md:text-brand-accent-pink/15 animate-float delay-2000">
          <svg className="w-6 h-6 md:w-8 md:h-8" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2L22 20H2L12 2Z" />
          </svg>
        </div>
      </div>

      {/* Mobile-first Refined Header */}
      <header className="relative z-50 border-b border-brand-gray-darker/20 md:border-brand-gray-darker/30 bg-brand-black/90 md:bg-brand-black/95 backdrop-blur-sm md:backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12 py-4 md:py-6">
          <nav className="flex items-center justify-between">
            <Logo size="md" />

            <div className="flex items-center space-x-3 md:space-x-6">
              <button
                className="header-nav-button hidden sm:flex items-center text-sm md:text-base font-charis"
                onClick={() => document.getElementById("services")?.scrollIntoView({ behavior: "smooth" })}
              >
                Serviços
              </button>

              <Button
                size="sm"
                className="btn-elegant text-white font-semibold px-4 py-2 md:px-6 md:py-2 text-sm md:text-base font-sora"
                onClick={() =>
                  window.open(
                    "https://wa.me/5548999450642?text=Olá%20Gustavo!%20Vim%20do%20seu%20site%20e%20quero%20transformar%20meu%20negócio%20com%20automação.",
                    "_blank",
                  )
                }
              >
                Falar Agora
              </Button>
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile-first Hero Section */}
      <section className="relative z-10 pt-16 pb-20 md:pt-24 md:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="max-w-5xl mx-auto text-center">
            <AnimatedSection animation="fade-up">
             
              <Icon />
            </AnimatedSection>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 md:mb-8 leading-tight text-shadow-elegant">
              <span className="gradient-text font-charis">Transforme</span>{" "}
              <span className="text-brand-white font-charis">seu Negócio</span>
              <br />
              <span className="text-brand-white font-charis">com </span>
              <span className="text-brand-purple font-charis">Automação Inteligente</span>
            </h1>

            <p className="text-lg sm:text-xl md:text-2xl text-brand-gray-light mb-4 md:mb-6 max-w-4xl mx-auto leading-relaxed font-sora">
              Sou <span className="text-brand-white font-semibold font-charis">Gustavo Martins</span>, especialista em
              <span className="text-brand-purple"> Automação</span>,
              <span className="text-brand-accent-blue"> Inteligência Artificial</span> e
              <span className="text-brand-accent-pink"> Desenvolvimento Web</span>.
            </p>

            <p className="text-base md:text-lg text-brand-gray mb-8 md:mb-12 max-w-3xl mx-auto font-sora">
              <span className="font-semibold text-brand-accent-emerald">Transforme seu Tempo</span> - Ajudo empresas a
              otimizar processos, reduzir custos e aumentar produtividade através de soluções tecnológicas inovadoras.
            </p>

            <div className="flex justify-center mb-12 md:mb-16">
              <Button
                size="lg"
                className="btn-elegant text-white font-bold text-base md:text-lg px-8 py-3 md:px-12 md:py-4 font-sora"
                onClick={() =>
                  window.open(
                    "https://wa.me/5548999450642?text=Olá%20Gustavo!%20Quero%20uma%20consultoria%20gratuita%20sobre%20automação%20para%20minha%20empresa.",
                    "_blank",
                  )
                }
              >
                Consultoria Gratuita
              </Button>
            </div>
</div>
            
        </div>
      </section>

      {/* Mobile-first Enhanced Services Section */}
      <AnimatedSection animation="fade-up">
        <section
          id="services"
          className="relative z-10 py-16 md:py-24 bg-gradient-to-b from-brand-black-light/40 to-brand-black-medium/20 md:from-brand-black-light/60 md:to-brand-black-medium/40"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
            <div className="text-center mb-12 md:mb-20">
              <Badge className="mb-4 md:mb-6 bg-brand-accent-blue/15 text-brand-accent-blue border-brand-accent-blue/25 px-3 py-1.5 md:px-4 md:py-2 text-xs md:text-sm font-sora">
                <Shield className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                Soluções Completas
              </Badge>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6 font-charis text-shadow-elegant">
                Como Posso <span className="text-brand-purple">Transformar</span> seu Negócio
              </h2>
              <p className="text-lg md:text-xl text-brand-white max-w-3xl mx-auto font-sora leading-relaxed">
                Soluções personalizadas em automação, IA e desenvolvimento web para revolucionar seus processos
                empresariais
              </p>
            </div>

            <div className="services-grid">
              <AnimatedSection animation="fade-up" delay={100}>
                <Card className="tech-classic-card group">
                  <CardContent className="service-card-content p-6 md:p-8">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-brand-purple rounded-xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300 glow-purple">
                      <Bot className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 font-charis">
                      Chatbots Inteligentes
                    </h3>
                    <p className="text-brand-gray-light mb-4 md:mb-6 leading-relaxed font-sora text-sm md:text-base">
                      Desenvolvimento de assistentes virtuais com IA para atendimento 24/7, qualificação de leads e
                      suporte automatizado.
                    </p>
                    <ul className="service-card-list space-y-2 md:space-y-3">
                      <li className="flex items-center text-brand-purple font-sora text-xs md:text-sm">
                        <CheckCircle className="w-3 h-3 md:w-4 md:h-4 mr-2 md:mr-3 flex-shrink-0" />
                        WhatsApp Business API
                      </li>
                      <li className="flex items-center text-brand-purple font-sora text-xs md:text-sm">
                        <CheckCircle className="w-3 h-3 md:w-4 md:h-4 mr-2 md:mr-3 flex-shrink-0" />
                        Integração com CRM
                      </li>
                      <li className="flex items-center text-brand-purple font-sora text-xs md:text-sm">
                        <CheckCircle className="w-3 h-3 md:w-4 md:h-4 mr-2 md:mr-3 flex-shrink-0" />
                        Processamento de Linguagem Natural
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection animation="fade-up" delay={200}>
                <Card className="tech-classic-card group">
                  <CardContent className="service-card-content p-6 md:p-8">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-brand-accent-blue rounded-xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Zap className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 font-charis">
                      Automação de Processos
                    </h3>
                    <p className="text-brand-gray-light mb-4 md:mb-6 leading-relaxed font-sora text-sm md:text-base">
                      Automatização completa de workflows empresariais para aumentar eficiência e reduzir custos
                      operacionais.
                    </p>
                    <ul className="service-card-list space-y-2 md:space-y-3">
                      <li className="flex items-center text-brand-accent-blue font-sora text-xs md:text-sm">
                        <CheckCircle className="w-3 h-3 md:w-4 md:h-4 mr-2 md:mr-3 flex-shrink-0" />
                        RPA (Robotic Process Automation)
                      </li>
                      <li className="flex items-center text-brand-accent-blue font-sora text-xs md:text-sm">
                        <CheckCircle className="w-3 h-3 md:w-4 md:h-4 mr-2 md:mr-3 flex-shrink-0" />
                        Integração de Sistemas
                      </li>
                      <li className="flex items-center text-brand-accent-blue font-sora text-xs md:text-sm">
                        <CheckCircle className="w-3 h-3 md:w-4 md:h-4 mr-2 md:mr-3 flex-shrink-0" />
                        Workflows Personalizados
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection animation="fade-up" delay={300}>
                <Card className="tech-classic-card group">
                  <CardContent className="service-card-content p-6 md:p-8">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-brand-accent-pink rounded-xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Brain className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 font-charis">
                      Inteligência Artificial
                    </h3>
                    <p className="text-brand-gray-light mb-4 md:mb-6 leading-relaxed font-sora text-sm md:text-base">
                      Implementação de soluções de IA para análise de dados, predições e tomada de decisões
                      inteligentes.
                    </p>
                    <ul className="service-card-list space-y-2 md:space-y-3">
                      <li className="flex items-center text-brand-accent-pink font-sora text-xs md:text-sm">
                        <CheckCircle className="w-3 h-3 md:w-4 md:h-4 mr-2 md:mr-3 flex-shrink-0" />
                        Machine Learning
                      </li>
                      <li className="flex items-center text-brand-accent-pink font-sora text-xs md:text-sm">
                        <CheckCircle className="w-3 h-3 md:w-4 md:h-4 mr-2 md:mr-3 flex-shrink-0" />
                        Análise Preditiva
                      </li>
                      <li className="flex items-center text-brand-accent-pink font-sora text-xs md:text-sm">
                        <CheckCircle className="w-3 h-3 md:w-4 md:h-4 mr-2 md:mr-3 flex-shrink-0" />
                        Computer Vision
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </AnimatedSection>

              <AnimatedSection animation="fade-up" delay={400}>
                <Card className="tech-classic-card group">
                  <CardContent className="service-card-content p-6 md:p-8">
                    <div className="w-12 h-12 md:w-16 md:h-16 bg-gradient-to-br from-brand-purple to-brand-accent-blue rounded-xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform duration-300">
                      <Globe className="w-6 h-6 md:w-8 md:h-8 text-white" />
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3 md:mb-4 font-charis">
                      Sites & Landing Pages
                    </h3>
                    <p className="text-brand-gray-light mb-4 md:mb-6 leading-relaxed font-sora text-sm md:text-base">
                      Criação de sites modernos, responsivos e landing pages de alta conversão com design profissional e
                      otimização para resultados.
                    </p>
                    <ul className="service-card-list space-y-2 md:space-y-3">
                      <li className="flex items-center text-brand-purple font-sora text-xs md:text-sm">
                        <CheckCircle className="w-3 h-3 md:w-4 md:h-4 mr-2 md:mr-3 flex-shrink-0" />
                        Design Responsivo e Moderno
                      </li>
                      <li className="flex items-center text-brand-purple font-sora text-xs md:text-sm">
                        <CheckCircle className="w-3 h-3 md:w-4 md:h-4 mr-2 md:mr-3 flex-shrink-0" />
                        Otimização para Conversão
                      </li>
                      <li className="flex items-center text-brand-purple font-sora text-xs md:text-sm">
                        <CheckCircle className="w-3 h-3 md:w-4 md:h-4 mr-2 md:mr-3 flex-shrink-0" />
                        SEO e Performance
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </AnimatedSection>
            </div>
          </div>
        </section>
      </AnimatedSection>

    

     

      {/* Mobile-first Refined Footer */}
      <footer className="relative z-10 border-t border-brand-gray-darker/20 md:border-brand-gray-darker/30 bg-brand-black-darker/85 md:bg-brand-black-darker/90 backdrop-blur-sm md:backdrop-blur-md py-12 md:py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
            <div className="lg:col-span-2">
              <Logo size="lg" className="mb-4 md:mb-6" />
              <p className="text-brand-gray-light mb-4 md:mb-6 text-sm md:text-base leading-relaxed max-w-md font-sora">
                Transformando negócios através da automação, inteligência artificial e desenvolvimento web, sempre com
                propósito e excelência.
              </p>
              <div className="flex space-x-4 md:space-x-6">
                <Link
                  href="https://www.linkedin.com/in/enygna-enterprises/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-purple hover:text-brand-accent-blue transition-colors hover:scale-110 transform duration-200"
                >
                  <Linkedin className="w-6 h-6 md:w-7 md:h-7" />
                </Link>
                <Link
                  href="https://www.instagram.com/enygna-enterprises/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-purple hover:text-brand-accent-pink transition-colors hover:scale-110 transform duration-200"
                >
                  <svg className="w-6 h-6 md:w-7 md:h-7" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </Link>
                <Link
                  href="https://github.com/enygna-enterprises"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-brand-purple hover:text-brand-accent-blue transition-colors hover:scale-110 transform duration-200"
                >
                  <Github className="w-6 h-6 md:w-7 md:h-7" />
                </Link>
                <Link
                  href="mailto:enygna.enterprises@gmail.com"
                  className="text-brand-purple hover:text-brand-accent-pink transition-colors hover:scale-110 transform duration-200"
                >
                  <Mail className="w-6 h-6 md:w-7 md:h-7" />
                </Link>
              </div>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4 md:mb-6 text-lg font-charis">Contato</h3>
              <ul className="space-y-3 md:space-y-4 text-brand-gray-light text-sm font-sora">
                <li>
                  <Link href="mailto:enygna.enterprises@gmail.com" className="hover:text-brand-purple transition-colors">
                    enygna.enterprises@gmail.com
                  </Link>
                </li>
                <li>
                  <Link
                    href="https://wa.me/5548999450642"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-brand-purple transition-colors"
                  >
                    +55 (48) 99945-0642
                  </Link>
                </li>
               
              </ul>
            </div>

            <div>
              <h3 className="text-white font-bold mb-4 md:mb-6 text-lg font-charis">Legal</h3>
              <ul className="space-y-3 md:space-y-4 text-brand-gray-light text-sm font-sora">
                <li>
                  <Link href="/politica-privacidade" className="hover:text-brand-purple transition-colors">
                    Política de Privacidade
                  </Link>
                </li>
                <li>
                  <Link href="/termos-uso" className="hover:text-brand-purple transition-colors">
                    Termos de Uso
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-brand-gray-darker/20 md:border-brand-gray-darker/30 mt-8 md:mt-12 pt-6 md:pt-8 text-center">
            <p className="text-brand-gray-light text-base font-sora">
              &copy; 2025 <span className="font-charis">Gustavo Martins</span>. Todos os direitos reservados.
            </p>
            <p className="text-brand-gray/60 text-xs md:text-sm mt-1 md:mt-2 font-sora italic">
              "Fazendo todas as coisas para a glória de Deus"
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
