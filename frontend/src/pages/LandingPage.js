import { motion } from "framer-motion";
import { OrbitControls, RoundedBox } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Link } from "react-router-dom";

const metrics = [
  { label: "Daily reflections", value: "24/7" },
  { label: "Emotion insights", value: "AI powered" },
  { label: "Immersive design", value: "3D ready" },
];

const pillars = [
  {
    title: "Live mood canvas",
    text: "Watch your emotions turn into a vibrant, evolving visual story.",
  },
  {
    title: "Calm intelligence",
    text: "Smart insights keep your self-awareness intuitive and effortless.",
  },
  {
    title: "Secure by design",
    text: "Private journaling with modern protection and a smooth experience.",
  },
];

function MoodScene() {
  return (
    <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 4, 4]} intensity={1.5} />
      <pointLight position={[-4, 2, -3]} intensity={1.2} color="#7c3aed" />
      <pointLight position={[4, -2, 2]} intensity={1.1} color="#22d3ee" />
      <group>
        <motion.group animate={{ rotateY: [0, Math.PI * 2], rotateX: [0.2, -0.2, 0.2] }} transition={{ duration: 12, repeat: Infinity, ease: "linear" }}>
          <RoundedBox args={[2.8, 2.8, 2.8]} radius={0.24} smoothness={8}>
            <meshStandardMaterial color="#7c3aed" emissive="#312e81" emissiveIntensity={0.5} metalness={0.5} roughness={0.2} />
          </RoundedBox>
          <mesh position={[0, 0, 1.55]}>
            <boxGeometry args={[1.2, 1.2, 0.1]} />
            <meshStandardMaterial color="#f5f3ff" transparent opacity={0.85} />
          </mesh>
          <mesh position={[0.8, 0.4, 1.4]}>
            <torusGeometry args={[0.25, 0.08, 16, 100]} />
            <meshStandardMaterial color="#22d3ee" emissive="#0f766e" emissiveIntensity={0.7} />
          </mesh>
          <mesh position={[-0.7, -0.6, 1.35]}>
            <torusGeometry args={[0.35, 0.09, 16, 100]} />
            <meshStandardMaterial color="#ec4899" emissive="#9d174d" emissiveIntensity={0.7} />
          </mesh>
        </motion.group>
      </group>
      <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} />
    </Canvas>
  );
}

export default function LandingPage() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050816] text-white">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute left-[-8%] top-[-10%] h-72 w-72 rounded-full bg-fuchsia-500/25 blur-3xl" />
        <div className="absolute right-[-5%] top-1/4 h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.15),_transparent_45%)]" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col px-6 py-6 lg:px-8">
        <header className="flex items-center justify-between rounded-full border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 via-cyan-400 to-fuchsia-500 text-lg shadow-lg shadow-violet-500/30">
              ✦
            </div>
            <div>
              <p className="font-display text-lg font-semibold">MoodBoard AI</p>
              <p className="text-xs text-slate-300">Immersive emotional design</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link to="/login" className="btn-ghost px-4 py-2 text-sm">
              Sign in
            </Link>
            <Link to="/register" className="btn-primary px-4 py-2 text-sm">
              Start free
            </Link>
          </div>
        </header>

        <main className="flex flex-1 flex-col justify-center py-10 lg:py-16">
          <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <div className="mb-5 inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-200">
                ✧ 3D animated journal experience
              </div>
              <h1 className="font-display text-5xl font-semibold leading-tight sm:text-6xl lg:text-7xl">
                Turn emotions into a
                <span className="block bg-gradient-to-r from-violet-300 via-cyan-300 to-fuchsia-300 bg-clip-text text-transparent">
                  living 3D universe.
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-lg leading-8 text-slate-300">
                Capture your thoughts, feel the energy shift, and explore a cinematic moodboard that feels as alive as your inner world.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/register" className="btn-primary px-7 py-3 text-lg">
                  Begin your journey
                </Link>
                <Link to="/login" className="btn-ghost px-7 py-3 text-lg">
                  Open your space
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                {metrics.map((item) => (
                  <div key={item.label} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-sm">
                    <p className="text-xl font-semibold text-white">{item.value}</p>
                    <p className="text-sm text-slate-400">{item.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.75, delay: 0.1 }}
              className="relative mx-auto flex h-[430px] w-full max-w-[540px] items-center justify-center"
            >
              <div className="absolute inset-0 rounded-[2rem] border border-white/10 bg-white/5 shadow-[0_0_120px_rgba(124,111,247,0.28)] backdrop-blur-xl" />
              <motion.div
                animate={{ y: [0, -12, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-6 top-8 h-24 w-24 rounded-3xl border border-cyan-400/30 bg-cyan-400/20 backdrop-blur-md"
              />
              <motion.div
                animate={{ y: [0, 14, 0], rotate: [0, -6, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                className="absolute right-8 top-12 h-20 w-20 rounded-full border border-fuchsia-400/30 bg-fuchsia-400/20 backdrop-blur-md"
              />
              <motion.div
                animate={{ y: [0, 12, 0], x: [0, 8, 0] }}
                transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
                className="absolute bottom-10 left-10 h-28 w-28 rounded-[2rem] border border-violet-400/30 bg-violet-400/20 backdrop-blur-md"
              />
              <div className="relative z-10 h-[300px] w-[300px] overflow-hidden rounded-[2rem] border border-white/15 bg-slate-950/40 shadow-[0_30px_90px_rgba(17,24,39,0.5)]">
                <MoodScene />
              </div>
            </motion.div>
          </div>

          <div className="mt-16 grid gap-6 md:grid-cols-3">
            {pillars.map((pillar) => (
              <motion.article
                key={pillar.title}
                whileHover={{ y: -6, scale: 1.01 }}
                className="glass-card p-6"
              >
                <h3 className="text-xl font-semibold text-white">{pillar.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-300">{pillar.text}</p>
              </motion.article>
            ))}
          </div>
        </main>

        <footer className="flex flex-col gap-2 border-t border-white/10 py-6 text-sm text-slate-400 sm:flex-row sm:items-center sm:justify-between">
          <p>Designed for thoughtful people who want calm, beautiful self-reflection.</p>
          <p>Developed by Daksh Malviya</p>
        </footer>
      </div>
    </div>
  );
}