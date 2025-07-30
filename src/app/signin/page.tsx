"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Code2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export default function SignInPage() {
  const [showPassword, setShowPassword] = useState(false);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-16 flex items-center justify-center container-padding">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-lg"
      >
        <motion.div variants={itemVariants} className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <Code2 className="h-8 w-8 text-primary" />
            <span className="font-montserrat font-bold text-xl">CCK</span>
          </Link>
        </motion.div>

        <motion.div variants={itemVariants}>
          <Card className="backdrop-blur-sm bg-card/80 border border-border/50">
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-center">Welcome back</CardTitle>
              <CardDescription className="text-center">
                Sign in to your account to continue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="email" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="email">Email</TabsTrigger>
                  <TabsTrigger value="student-id">Student ID</TabsTrigger>
                </TabsList>
                <TabsContent value="email">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="your.email@university.edu" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password">Password</Label>
                        <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                          Forgot password?
                        </Link>
                      </div>
                      <div className="relative">
                        <Input 
                          id="password" 
                          type={showPassword ? "text" : "password"} 
                          placeholder="••••••••" 
                        />
                        <Button 
                          type="button"
                          variant="ghost" 
                          size="icon" 
                          className="absolute right-2 top-1/2 -translate-y-1/2"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                          <span className="sr-only">
                            {showPassword ? "Hide password" : "Show password"}
                          </span>
                        </Button>
                      </div>
                    </div>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      Sign In
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="student-id">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="student-id">Student ID</Label>
                      <Input id="student-id" type="text" placeholder="e.g., S123456789" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="id-password">Password</Label>
                        <Link href="/forgot-password" className="text-sm text-primary hover:underline">
                          Forgot password?
                        </Link>
                      </div>
                      <div className="relative">
                        <Input 
                          id="id-password" 
                          type={showPassword ? "text" : "password"} 
                          placeholder="••••••••" 
                        />
                        <Button 
                          type="button"
                          variant="ghost" 
                          size="icon" 
                          className="absolute right-2 top-1/2 -translate-y-1/2"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4" />
                          ) : (
                            <Eye className="h-4 w-4" />
                          )}
                          <span className="sr-only">
                            {showPassword ? "Hide password" : "Show password"}
                          </span>
                        </Button>
                      </div>
                    </div>
                    <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
                      Sign In
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4">
              <div className="text-center text-sm text-muted-foreground">
                Don't have an account?{" "}
                <Link href="/signup" className="text-primary hover:underline">
                  Sign up
                </Link>
              </div>
            </CardFooter>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}