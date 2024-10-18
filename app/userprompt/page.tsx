// "use client";
// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import axios from "axios";
// import VideoCard from "@/components/VideoCard";
// import { Youtube, Search, Menu, Bell, User, LogOut } from "lucide-react";
// import { SignedIn,SignedOut, RedirectToSignIn, useClerk } from "@clerk/nextjs";
// import Link from "next/link";
// import { useRouter } from "next/navigation";

// interface Video {
//   id: string;
//   thumbnailUrl: string;
//   title: string;
//   channelTitle: string;
//   views: string;
// }

// export default function Component() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [videos, setVideos] = useState<Video[]>([]);
//   const { signOut } = useClerk();
//   const router = useRouter(); // Initialize the router

//   const fetchData = async (prompt: string) => {
//     try {
//       const response = await axios.post("/api/prompt", { prompt });
//       setVideos(response.data.videos);
//     } catch (e) {
//       console.error("Error fetching videos", e);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleSearch = (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     fetchData(searchQuery);
//   };
//   const handleSignOut = async () => {
//     await signOut();
//     router.push("/");
//   };
  

//   return (
//     <div className="min-h-screen bg-gray-900 text-gray-100">
//       <SignedIn>
//         <nav className="bg-gray-800 py-2 px-4 md:px-6 lg:px-8">
//           <div className="max-w-7xl mx-auto flex items-center justify-between">
//             <div className="flex items-center">
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="mr-2 text-gray-300 hover:text-white"
//               >
//                 <Menu className="h-6 w-6" />
//               </Button>
//               <Youtube className="h-8 w-8 text-red-500 mr-2" />
//               <span className="text-xl font-bold">FeedSage</span>
//             </div>
//             <form
//               onSubmit={handleSearch}
//               className="flex-grow max-w-md mx-4 sm:max-w-xl md:max-w-2xl lg:max-w-3xl"
//             >
//               <div className="relative">
//                 <Input
//                   type="search"
//                   placeholder="Search"
//                   className="w-full bg-gray-700 border-gray-600 text-white placeholder-gray-400 pr-10"
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                 />
//                 <Button
//                   type="submit"
//                   size="icon"
//                   className="absolute right-0 top-0 bg-gray-600 hover:bg-gray-500"
//                 >
//                   <Search className="h-4 w-4" />
//                 </Button>
//               </div>
//             </form>
//             <div className="flex items-center">
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="text-gray-300 hover:text-white"
//               >
//                 <Bell className="h-6 w-6" />
//               </Button>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="text-gray-300 hover:text-white ml-2"
//               >
//                 <User className="h-6 w-6" />
//               </Button>
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className="text-gray-300 hover:text-white ml-2"
//                 onClick={handleSignOut} // Use the signOut handler
//               >
//                 <LogOut className="h-6 w-6" />
//               </Button>
//             </div>
//           </div>
//         </nav>

//         <div className="container mx-auto p-4">
//           {videos && videos.length > 0 ? (
//             <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//               {videos.map((video) => (
//                 <Link href={`/video/${video.id}`} key={video.id}>
//                   <VideoCard
//                     title={video.title}
//                     imageUrl={video.thumbnailUrl}
//                     channelName={video.channelTitle}
//                     views={video.views}
//                   />
//                 </Link>
//               ))}
//             </div>
//           ) : (
//             <div className="text-center text-gray-400">
//               Try searching to see some results!
//             </div>
//           )}  

//           {loading && <div className="text-center">Loading...</div>}
//         </div>
//       </SignedIn>

//       <SignedOut>
//         <RedirectToSignIn />
//       </SignedOut>
//     </div>
//   );
// }
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import VideoCard from "@/components/VideoCard";
import { Youtube, Search, Menu, Bell, User, LogOut } from "lucide-react";
import { SignedIn, SignedOut, useClerk } from "@clerk/nextjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"


interface Video {
  id: string;
  thumbnailUrl: string;
  title: string;
  channelTitle: string;
  views: string;
}

export default function Component() {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [videos, setVideos] = useState<Video[]>([]);
  const { signOut } = useClerk();
  const router = useRouter();

  const fetchData = async (prompt: string) => {
    try {
      const response = await axios.post("/api/prompt", { prompt });
      setVideos(response.data.videos);
    } catch (e) {
      console.error("Error fetching videos", e);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    fetchData(searchQuery);
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      // After signing out, explicitly navigate to the home page
      router.push("/");
      // Optional: Force a hard refresh to clear any cached states
      router.refresh();
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <SignedIn>
        <nav className="bg-gray-800 py-2 px-4 md:px-6 lg:px-8">
          {/* ... rest of your nav content ... */}
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="mr-2 text-gray-300 hover:text-white"
              >
                <Menu className="h-6 w-6" />
              </Button>
              <Youtube className="h-8 w-8 text-red-500 mr-2" />
              <span className="text-xl font-bold">FeedSage</span>
            </div>
            <form
              onSubmit={handleSearch}
              className="flex-grow max-w-md mx-4 sm:max-w-xl md:max-w-2xl lg:max-w-3xl"
            >
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search"
                  className="w-full bg-gray-700 border-gray-600 text-white placeholder-gray-400 pr-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button
                  type="submit"
                  size="icon"
                  className="absolute right-0 top-0 bg-gray-600 hover:bg-gray-500"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </form>
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-300 hover:text-white"
              >
                <Bell className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-300 hover:text-white ml-2"
              >
                <User className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-300 hover:text-white ml-2"
                onClick={handleSignOut}
              >
                <LogOut className="h-6 w-6" />
              </Button>
            </div>
          </div>
        </nav>

        <div className="container mx-auto p-4">
          {videos && videos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {videos.map((video) => (
                <Link href={`/video/${video.id}`} key={video.id}>
                  <VideoCard
                    title={video.title}
                    imageUrl={video.thumbnailUrl}
                    channelName={video.channelTitle}
                    views={video.views}
                  />
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-400">
              Try searching to see some results!
            </div>
          )}

          {loading && <div className="text-center">Loading...</div>}
        </div>
      </SignedIn>

      {/* Remove RedirectToSignIn and handle unauthenticated state differently */}
      <SignedOut>
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-primary/20 to-background">
        <Card className="w-full max-w-md mx-4">
          <CardHeader className="text-center space-y-1">
            <CardTitle className="text-3xl font-bold">Welcome to FeedSage</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-center">
            <Youtube className="h-8 w-8 text-red-500 mr-2" />
            <span className="text-xl font-bold">FeedSage</span>
            </div>
            <p className="text-center text-muted-foreground">
              Your personal AI-powered feed curator and content discovery assistant.
            </p>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Link href="/sign-in" className="w-full">
              <Button className="w-full" size="lg">
                Sign In
              </Button>
            </Link>
            <p className="text-sm text-center text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/sign-up" className="underline underline-offset-2 hover:text-primary">
                Sign up
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </SignedOut>
    </div>
  );
}