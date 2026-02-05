import TechItem from "@/components/TechItem";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f0f0f0] text-gray-900 flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-4xl w-full text-center space-y-12">
        <div className="space-y-5">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            next-products-api
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto font-light">
            A clean Next.js API for products, reviews, and users — built with modern tools.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-10 md:gap-16 pt-8">
          <TechItem
            src="https://cdn.worldvectorlogo.com/logos/next-js.svg"
            alt="Next.js"
            name="Next.js"
          />
          <TechItem
            src="https://cdn.worldvectorlogo.com/logos/react-2.svg"
            alt="React"
            name="React"
          />
          <TechItem
            src="https://cdn.worldvectorlogo.com/logos/typescript.svg"
            alt="TypeScript"
            name="TypeScript"
          />
          <TechItem
            src="https://cdn.worldvectorlogo.com/logos/prisma-3.svg"
            alt="Prisma"
            name="Prisma"
          />
          <TechItem
            src="https://cdn.worldvectorlogo.com/logos/postgresql.svg"
            alt="PostgreSQL"
            name="PostgreSQL"
          />
          <TechItem
            src="https://cdn.worldvectorlogo.com/logos/tailwindcss.svg"
            alt="Tailwind CSS"
            name="Tailwind"
          />
        </div>

        <div className="pt-10">
          <Link
            href="https://github.com/rethabile2004"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-8 py-4 bg-gray-800 text-white text-lg font-medium rounded-lg hover:bg-gray-900 transition-colors border border-gray-700"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.377.202 2.394.1 2.647.64.699 1.026 1.592 1.026 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12c0-5.523-4.478-10-10-10z"/>
            </svg>
            View on GitHub
          </Link>
        </div>

        <p className="text-sm text-gray-500 pt-16">
          Built with Next.js App Router • Prisma • PostgreSQL
        </p>
      </div>
    </main>
  );
}