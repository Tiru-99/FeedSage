"use client";
import React, { useState } from "react";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Player } from "@lottiefiles/react-lottie-player";
import { Button } from "@/components/ui/button";
import { Youtube, Zap, Sparkles, ChevronRight, Menu, X } from "lucide-react";
import { useAuth, RedirectToSignIn } from "@clerk/nextjs";

export default function HomePage() {
  const { isSignedIn } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  <footer className="bg-indigo-900 bg-opacity-20 py-8 border-t border-indigo-800">
    <div className="container mx-auto px-4 text-center text-indigo-300">
      <p>&copy; 2024 FeedSage. All rights reserved.</p>
      <div className="mt-4 space-x-4">
        <a href="#" className="hover:text-indigo-100 transition-colors">
          Privacy Policy
        </a>
        <a href="#" className="hover:text-indigo-100 transition-colors">
          Terms of Service
        </a>
        <a href="#" className="hover:text-indigo-100 transition-colors">
          Contact Us
        </a>
      </div>
    </div>
  </footer>;

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Navbar */}
      <nav className="bg-black border-b border-indigo-900 p-4 fixed w-full z-50">
        <div className="container mx-auto flex justify-between items-center">
          <motion.div
            className="flex items-center space-x-2"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Youtube className="text-indigo-500" />
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-600">
              FeedSage
            </span>
          </motion.div>
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="text-indigo-300" />
              ) : (
                <Menu className="text-indigo-300" />
              )}
            </Button>
          </div>
        </div>
      </nav>

      <main className="pt-20">
        <section className="container mx-auto px-4 py-16 flex flex-col md:flex-row items-center justify-between md:ml-8">
          <motion.div
            className="md:w-1/2 mb-8 md:mb-0"
            initial="hidden"
            animate="visible"
            variants={staggerChildren}
          >
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-4 bg-clip-text text-transparent  bg-gradient-to-r from-indigo-400 to-purple-600"
              variants={fadeInUp}
            >
              Elevate Your YouTube Experience
            </motion.h1>
            <motion.p
              className="text-xl text-indigo-300 mb-8"
              variants={fadeInUp}
            >
              Harness the power of AI to curate your perfect YouTube feed.
            </motion.p>
            <motion.div variants={fadeInUp}>
              {isSignedIn ? (
                <>
                  <Link href="/userprompt">
                    <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-8 py-3 rounded-full text-lg">
                      Start Your Journey
                    </Button>
                  </Link>
                  {/* Success message after login */}
                  <div className="mt-4 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
                    <p className="font-semibold">
                      🎉 You are successfully logged in!
                    </p>
                  </div>
                </>
              ) : (
                <Link href="/sign-in">
                  <Button className="bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white px-8 py-3 rounded-full text-lg">
                    Start Your Journey
                  </Button>
                </Link>
              )}
            </motion.div>
          </motion.div>
          <motion.div
            className="md:w-1/2"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <Player
              autoplay
              loop
              src="https://assets3.lottiefiles.com/packages/lf20_qp1q7mct.json"
              style={{ height: "400px", width: "100%" }}
            />
          </motion.div>
        </section>
        <section className="py-16 bg-indigo-900 bg-opacity-10">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center text-indigo-300">
              How FeedSage Works
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  icon: <Zap size={48} />,
                  title: "Smart Filtering",
                  description:
                    "Our AI analyzes your preferences to filter out irrelevant content.",
                },
                {
                  icon: <Youtube size={48} />,
                  title: "Personalized Feed",
                  description:
                    "Receive a curated feed tailored to your interests and goals.",
                },
                {
                  icon: <Sparkles size={48} />,
                  title: "Continuous Learning",
                  description:
                    "FeedSage evolves with your changing preferences over time.",
                },
              ].map((item, index) => (
                <motion.div
                  key={item.title}
                  className="bg-indigo-900 bg-opacity-20 p-6 rounded-lg text-center border border-indigo-800"
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <div className="mb-4 text-indigo-400">{item.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-indigo-300">
                    {item.title}
                  </h3>
                  <p className="text-indigo-200">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16">
          <motion.div
            className="bg-indigo-900 bg-opacity-20 p-8 rounded-lg shadow-lg border border-indigo-800 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-semibold mb-6 text-indigo-300 text-center">
              Ready to Transform Your YouTube Experience?
            </h2>
            <p className="text-indigo-200 mb-6 text-center">
              Join the FeedSage community and take control of your content
              consumption. Start focusing on what truly matters to you.
            </p>
            <form className="space-y-4">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-indigo-900 bg-opacity-50 text-indigo-100 border-indigo-700 placeholder-indigo-400"
              />
              <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 text-white">
                Get Early Access
                <ChevronRight className="ml-2" />
              </Button>
            </form>
          </motion.div>
        </section>
      </main>
      <footer className="bg-indigo-900 bg-opacity-20 py-8 border-t border-indigo-800">
        <div className="container mx-auto px-4 text-center text-indigo-300">
          <p>&copy; 2024 FeedSage. All rights reserved.</p>
          <div className="mt-4 space-x-4">
            <a href="#" className="hover:text-indigo-100 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-indigo-100 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-indigo-100 transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
