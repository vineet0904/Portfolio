import { motion } from "framer-motion";
import { Icon } from "@iconify/react"; 
import {
  Code,
  Brain,
  Cpu,
  Bot,
  Layers,
  Cloud,
  Database,
  Settings,
} from "lucide-react";


import type { LucideIcon } from "lucide-react";

import SectionHeading from "@/components/UI/SectionHeading";
import skillsData from "@/data/skills.json";

const iconMap: Record<string, LucideIcon> = {
  Code,
  Brain,
  Cpu,
  Bot,
  Layers,
  Cloud,
  Database,
  Settings,
};
const techIcons: Record<string, string> = {
  // Programming
  Python: "logos:python",
  C: "logos:c",
  "C++": "logos:c-plusplus",
  SQL: "vscode-icons:file-type-sql",

  // AI / ML
 "Scikit-Learn": "devicon:scikitlearn",
 NumPy: "devicon:numpy",
 Pandas: "devicon:pandas",
  OpenCV: "devicon:opencv",
  Matplotlib: "devicon:matplotlib",
  Seaborn: "logos:seaborn",
  "Hugging Face": "simple-icons:huggingface",

  // Deep Learning
  TensorFlow: "logos:tensorflow",
  PyTorch: "logos:pytorch",
  Keras: "devicon:keras",
  BERT: "mdi:brain",
  DistilRoBERTa: "mdi:brain",

  // LLMs & Agentic AI
  OpenAI: "simple-icons:openai",
  Gemini: "simple-icons:googlegemini",
  "Sentence Transformers": "mdi:vector-link",
  LangChain: "simple-icons:langchain",
  RAG: "mdi:database-search",
  "Prompt Engineering": "mdi:text-box-edit-outline",
  "AI Agents": "mdi:robot-outline",

  // Databases
  PostgreSQL: "logos:postgresql",
  MongoDB: "logos:mongodb-icon",
  FAISS: "mdi:database-search",

  // Developer Tools
  Git: "logos:git-icon",
  GitHub: "logos:github-icon",
  Postman: "logos:postman-icon",
  "VS Code": "logos:visual-studio-code",
  "Power BI": "logos:microsoft-power-bi",
  "MS Excel": "logos:microsoft-excel",
  ChatGPT: "simple-icons:openai",
  Claude: "simple-icons:anthropic",
  Antigravity: "mdi:rocket-launch-outline",
};

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative z-10 section-pad px-4 md:px-8"
    >
      <div className="max-w-7xl mx-auto">

        <SectionHeading
          title="Skills"
          subtitle="Tech Arsenal"
          icon={<Code size={14} className="text-primary" />}
        />

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
          {skillsData.categories.map((category, categoryIndex) => {
  const CategoryIcon = iconMap[category.icon] || Code;

  return (
    <motion.div
      key={category.id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: categoryIndex * 0.08 }}
      whileHover={{ y: -6 }}
    className="
relative
overflow-hidden
rounded-3xl
border
border-slate-700/50
bg-slate-900/90
backdrop-blur-xl
p-6
transition-all
duration-500
hover:bg-slate-900
hover:border-primary/50
hover:shadow-[0_0_40px_rgba(99,102,241,0.18)]
">
      {/* Glow Effect */}
      <motion.div
className="absolute inset-0 rounded-3xl bg-gradient-to-br from-primary/5 via-transparent to-secondary/5"
animate={{
opacity:[0.2,0.5,0.2]
}}
transition={{
duration:4,
repeat:Infinity
}}
/>
      {/* Header */}
      <div className="relative flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center">
        <motion.div

whileHover={{
rotate:12,
scale:1.15
}}

transition={{
type:"spring",
stiffness:250
}}

>

<CategoryIcon
size={24}
className="text-primary"
/>

</motion.div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-white">
            {category.name}
          </h3>

          <p className="text-xs text-slate-400">
            {category.skills.length} Technologies
          </p>
        </div>
      </div>

      {/* Skills Container */}
      <div className="flex flex-wrap gap-3">
        {category.skills.map((skill, skillIndex) => (
  <motion.div
    key={skill.name}
    initial={{ opacity: 0, scale: 0.9 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{
      delay: categoryIndex * 0.08 + skillIndex * 0.03,
    }}
    whileHover={{
y:-10,
scale:1.02
}}
    className="
group
relative
overflow-hidden
px-4
py-2.5
rounded-xl
border
border-slate-700
bg-slate-800
backdrop-blur-lg
hover:border-primary/40
hover:bg-slate-700
hover:shadow-[0_0_18px_rgba(99,102,241,.18)]
transition-all
duration-300
cursor-default
"
  >
  <div className="flex items-center gap-2">

  <div
    className="
      w-7
      h-7
      rounded-lg
      bg-gradient-to-br
      from-slate-700
to-slate-800
      flex
      items-center
      justify-center
      text-[10px]
      font-bold
      text-primary
      shrink-0
    "
  >
    {techIcons[skill.name] ? (
      <Icon
        icon={techIcons[skill.name]}
        width={18}
        height={18}
      />
    ) : (
      skill.name.substring(0, 2).toUpperCase()
    )}
  </div>

  <motion.span
    whileHover={{ x: 3 }}
    className="
      text-sm
      font-medium
      text-slate-300
      group-hover:text-white
      transition-colors
    "
  >
    {skill.name}
  </motion.span>

</div>
  </motion.div>
))}

      </div>
    </motion.div>
  );
})}

        </div>
      </div>
    </section>
  );
}