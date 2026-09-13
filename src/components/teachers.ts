export interface Teacher {
  slug: string;
  photo: string;
  name: string;
  highlight: string;
  subject: string;
  formation: string;
  bio: string[];
  highlights: string[];
}

export const teachers: Teacher[] = [
  {
    slug: "francisco-petronio",
    photo: "/image/prof-francisco.jpg",
    name: "Francisco",
    highlight: "Petrônio",
    subject: "Professor de Português e Conhecimentos Gerais",
    formation: "Formado em Letras pela UFCG",
    bio: [
      "Francisco Petrônio é formado em Letras pela Universidade Federal de Campina Grande (UFCG) e dedica sua carreira a preparar candidatos para os principais concursos públicos do país.",
      "Suas aulas unem interpretação de texto, gramática aplicada e uma leitura atenta do que cada banca examinadora costuma cobrar — sempre com foco em transformar teoria em pontos na prova.",
    ],
    highlights: [
      "Interpretação e reescrita de textos",
      "Gramática aplicada às provas",
      "Leitura crítica do estilo de cada banca",
    ],
  },
  {
    slug: "luis-fernando",
    photo: "/image/prof-luis.jpg",
    name: "Luis",
    highlight: "Fernando",
    subject: "Professor de Matemática e Informática",
    formation:
      "Formado em Matemática, Ciência e Tecnologia e em Engenharia de Computação pela UFERSA, mestrando em Engenharia Elétrica pela UFERSA",
    bio: [
      "Luis Fernando é formado em Matemática, Ciência e Tecnologia e em Engenharia de Computação pela Universidade Federal Rural do Semi-Árido (UFERSA), onde também cursa o mestrado em Engenharia Elétrica.",
      "Com sólida formação técnica, ele transforma tópicos que costumam assustar — raciocínio lógico, matemática e informática — em conteúdo objetivo e aplicável, direto ao que a prova exige.",
    ],
    highlights: [
      "Raciocínio lógico e matemática para concursos",
      "Informática básica e aplicada",
      "Resolução de questões com métodos rápidos",
    ],
  },
  {
    slug: "antonio-junior",
    photo: "/image/prof-antonio.jpg",
    name: "Antônio",
    highlight: "Junior",
    subject: "Professor de Português e Conhecimentos Gerais",
    formation: "Formado em Letras pela UFCG e mestrando em Ensino pela UERN",
    bio: [
      "Antônio Júnior é formado em Letras pela Universidade Federal de Campina Grande (UFCG) e mestrando em Ensino pela Universidade do Estado do Rio Grande do Norte (UERN).",
      "Sua vivência acadêmica em pesquisa de ensino se reflete em aulas estruturadas, que ajudam o aluno a organizar o próprio raciocínio na hora de interpretar enunciados e escolher a alternativa certa.",
    ],
    highlights: [
      "Português e conhecimentos gerais",
      "Estratégias de estudo baseadas em pesquisa de ensino",
      "Correção de redação e produção textual",
    ],
  },
];
