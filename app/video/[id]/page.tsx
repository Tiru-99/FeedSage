// 'use client'

// import { useEffect, useState } from "react"
// import { useParams } from "next/navigation"
// import axios from "axios"
// import { ThumbsUp, MessageCircle, Share2, Flag, ChevronDown, ChevronUp } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import { Skeleton } from "@/components/ui/skeleton"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

// interface Video {
//   id: string
//   title: string
//   description: string
//   channelTitle: string
//   views: string
//   likes: string
//   videoUrl: string
// }

// interface Comment {
//   id: string
//   user: string
//   text: string
//   likes: number
//   time: string
// }

// export default function VideoPage() {
//   const { id } = useParams()
//   const [video, setVideo] = useState<Video | null>(null)
//   const [loading, setLoading] = useState(true)
//   const [error, setError] = useState<string | null>(null)
//   // Remove this line
//   //const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false)

//   useEffect(() => {
//     const fetchVideo = async () => {
//       try {
//         const response = await axios.get(`/api/videoplay/${id}`)
//         setVideo(response.data)
//       } catch (e) {
//         console.log("Error fetching video details:", e)
//         setError("Failed to load video. Please try again later.")
//       } finally {
//         setLoading(false)
//       }
//     }

//     if (id) fetchVideo()
//   }, [id])

//   // Mock data for recommended videos
//   const recommendedVideos = [
//     { id: '1', title: 'Recommended Video 1', views: '100K views', thumbnail: '/placeholder.svg?height=120&width=200' },
//     { id: '2', title: 'Recommended Video 2', views: '200K views', thumbnail: '/placeholder.svg?height=120&width=200' },
//     { id: '3', title: 'Recommended Video 3', views: '150K views', thumbnail: '/placeholder.svg?height=120&width=200' },
//   ]

//   // Mock data for comments
//   const comments: Comment[] = [
//     { id: '1', user: 'User1', text: 'Great video!', likes: 10, time: '2 days ago' },
//     { id: '2', user: 'User2', text: 'Very informative, thanks for sharing!', likes: 5, time: '1 day ago' },
//   ]

//   if (loading) {
//     return (
//       <div className="container mx-auto py-8 px-4">
//         <div className="flex flex-col md:flex-row gap-6">
//           <div className="md:w-2/3">
//             <Skeleton className="w-full aspect-video mb-4" />
//             <Skeleton className="h-8 w-3/4 mb-2" />
//             <Skeleton className="h-4 w-1/2 mb-4" />
//             <Skeleton className="h-20 w-full" />
//           </div>
//           <div className="md:w-1/3">
//             <Skeleton className="h-8 w-full mb-4" />
//             {[1, 2, 3].map((_, i) => (
//               <div key={i} className="flex gap-2 mb-4">
//                 <Skeleton className="w-40 h-20" />
//                 <div className="flex-1">
//                   <Skeleton className="h-4 w-full mb-2" />
//                   <Skeleton className="h-3 w-2/3" />
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     )
//   }

//   if (error) {
//     return <div className="container mx-auto py-8 px-4 text-center text-red-500">{error}</div>
//   }

//   if (!video) {
//     return <div className="container mx-auto py-8 px-4 text-center">Video not found.</div>
//   }

//   return (
//     <div className="min-h-screen bg-background text-foreground">
//       <div className="container mx-auto py-8 px-4">
//         <div className="flex flex-col md:flex-row gap-6">
//           <div className="md:w-2/3">
//             <div className="mb-6">
//               <iframe
//                 width="100%"
//                 height="480"
//                 src={`https://www.youtube.com/embed/${video.id}`}
//                 allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//                 allowFullScreen
//                 className="rounded-lg"
//               ></iframe>
//             </div>
//             <h1 className="text-2xl font-bold mb-2">{video.title}</h1>
//             <div className="flex items-center justify-between mb-4">
//               <div className="flex items-center gap-2">
//                 <Avatar>
//                   <AvatarFallback>{video.channelTitle[0]}</AvatarFallback>
//                 </Avatar>
//                 <div>
//                   <p className="font-semibold">{video.channelTitle}</p>
//                   <p className="text-sm text-muted-foreground">{video.views} views</p>
//                 </div>
//               </div>
//               <div className="flex items-center gap-2">
//                 <Button variant="outline" size="sm">
//                   <ThumbsUp className="w-4 h-4 mr-2" />
//                   {video.likes}
//                 </Button>
//                 <Button variant="outline" size="sm">
//                   <Share2 className="w-4 h-4 mr-2" />
//                   Share
//                 </Button>
//                 <Button variant="outline" size="sm">
//                   <Flag className="w-4 h-4 mr-2" />
//                   Report
//                 </Button>
//               </div>
//             </div>
//             <Collapsible
//               className="mb-6 bg-muted p-4 rounded-lg"
//             >
//               <div className="flex justify-between items-center">
//                 <h3 className="text-lg font-semibold">Description</h3>
//                 <CollapsibleTrigger asChild>
//                   <Button variant="ghost" size="sm">
//                     {video.description ? (
//                       <ChevronUp className="h-4 w-4" />
//                     ) : (
//                       <ChevronDown className="h-4 w-4" />
//                     )}
//                   </Button>
//                 </CollapsibleTrigger>
//               </div>
//               <CollapsibleContent className="mt-2">
//                 <p className="text-muted-foreground whitespace-pre-wrap">{video.description}</p>
//               </CollapsibleContent>
//             </Collapsible>
//             <div className="mb-6">
//               <h2 className="text-xl font-semibold mb-4">Comments</h2>
//               {comments.map((comment) => (
//                 <div key={comment.id} className="flex gap-4 mb-4">
//                   <Avatar>
//                     <AvatarFallback>{comment.user[0]}</AvatarFallback>
//                   </Avatar>
//                   <div>
//                     <div className="flex items-center gap-2 mb-1">
//                       <p className="font-semibold">{comment.user}</p>
//                       <p className="text-sm text-muted-foreground">{comment.time}</p>
//                     </div>
//                     <p>{comment.text}</p>
//                     <div className="flex items-center gap-2 mt-2">
//                       <Button variant="ghost" size="sm">
//                         <ThumbsUp className="w-4 h-4 mr-2" />
//                         {comment.likes}
//                       </Button>
//                       <Button variant="ghost" size="sm">
//                         <MessageCircle className="w-4 h-4 mr-2" />
//                         Reply
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//           {/* <div className="md:w-1/3">
//             <h2 className="text-xl font-semibold mb-4">Recommended Videos</h2>
//             {recommendedVideos.map((video) => (
//               <div key={video.id} className="flex gap-2 mb-4">
//                 <img src={video.thumbnail} alt={video.title} className="w-40 h-24 object-cover rounded" />
//                 <div>
//                   <h3 className="font-semibold line-clamp-2">{video.title}</h3>
//                   <p className="text-sm text-muted-foreground">{video.views}</p>
//                 </div>
//               </div>
//             ))}
//           </div> */} 
//         </div>
//       </div>
//     </div>
//   )
// }
'use client'

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import axios from "axios"
import { ThumbsUp, MessageCircle, Share2, Flag, ChevronDown, ChevronUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"

interface Video {
  id: string
  title: string
  description: string
  channelTitle: string
  views: string
  likes: string
  videoUrl: string
}

interface Comment {
  id: string
  user: string
  text: string
  likes: number
  time: string
}

export default function VideoPage() {
  const { id } = useParams()
  const [video, setVideo] = useState<Video | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const response = await axios.get(`/api/videoplay/${id}`)
        setVideo(response.data)
      } catch (e) {
        console.log("Error fetching video details:", e)
        setError("Failed to load video. Please try again later.")
      } finally {
        setLoading(false)
      }
    }

    if (id) fetchVideo()
  }, [id])

  const recommendedVideos = [
    { id: '1', title: 'Recommended Video 1', views: '100K views', thumbnail: '/placeholder.svg?height=120&width=200' },
    { id: '2', title: 'Recommended Video 2', views: '200K views', thumbnail: '/placeholder.svg?height=120&width=200' },
    { id: '3', title: 'Recommended Video 3', views: '150K views', thumbnail: '/placeholder.svg?height=120&width=200' },
  ]

  const comments: Comment[] = [
    { id: '1', user: 'User1', text: 'Great video!', likes: 10, time: '2 days ago' },
    { id: '2', user: 'User2', text: 'Very informative, thanks for sharing!', likes: 5, time: '1 day ago' },
  ]

  if (loading) {
    return (
      <div className="container mx-auto py-8 px-4 bg-gray-900 text-gray-200">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-2/3">
            <Skeleton className="w-full aspect-video mb-4 bg-gray-800" />
            <Skeleton className="h-8 w-3/4 mb-2 bg-gray-800" />
            <Skeleton className="h-4 w-1/2 mb-4 bg-gray-800" />
            <Skeleton className="h-20 w-full bg-gray-800" />
          </div>
          <div className="md:w-1/3">
            <Skeleton className="h-8 w-full mb-4 bg-gray-800" />
            {[1, 2, 3].map((_, i) => (
              <div key={i} className="flex gap-2 mb-4">
                <Skeleton className="w-40 h-20 bg-gray-800" />
                <div className="flex-1">
                  <Skeleton className="h-4 w-full mb-2 bg-gray-800" />
                  <Skeleton className="h-3 w-2/3 bg-gray-800" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return <div className="container mx-auto py-8 px-4 text-center text-red-500 bg-gray-900">{error}</div>
  }

  if (!video) {
    return <div className="container mx-auto py-8 px-4 text-center text-gray-200 bg-gray-900">Video not found.</div>
  }

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200">
      <div className="container mx-auto py-8 px-4">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="md:w-2/3">
            <div className="mb-6">
              <iframe
                width="100%"
                height="480"
                src={`https://www.youtube.com/embed/${video.id}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-lg"
              ></iframe>
            </div>
            <h1 className="text-2xl font-bold mb-2 text-gray-100">{video.title}</h1>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarFallback>{video.channelTitle[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-semibold text-gray-100">{video.channelTitle}</p>
                  <p className="text-sm text-gray-400">{video.views} views</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="bg-gray-800 text-gray-200 hover:bg-gray-700">
                  <ThumbsUp className="w-4 h-4 mr-2" />
                  {video.likes}
                </Button>
                <Button variant="outline" size="sm" className="bg-gray-800 text-gray-200 hover:bg-gray-700">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="outline" size="sm" className="bg-gray-800 text-gray-200 hover:bg-gray-700">
                  <Flag className="w-4 h-4 mr-2" />
                  Report
                </Button>
              </div>
            </div>
            <Collapsible
              className="mb-6 bg-gray-800 p-4 rounded-lg"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-100">Description</h3>
                <CollapsibleTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-gray-200 hover:bg-gray-700">
                    {video.description ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </Button>
                </CollapsibleTrigger>
              </div>
              <CollapsibleContent className="mt-2">
                <p className="text-gray-300 whitespace-pre-wrap">{video.description}</p>
              </CollapsibleContent>
            </Collapsible>
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-100">Comments</h2>
              {comments.map((comment) => (
                <div key={comment.id} className="flex gap-4 mb-4">
                  <Avatar>
                    <AvatarFallback>{comment.user[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-gray-100">{comment.user}</p>
                      <p className="text-sm text-gray-400">{comment.time}</p>
                    </div>
                    <p className="text-gray-300">{comment.text}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Button variant="ghost" size="sm" className="text-gray-300 hover:bg-gray-800">
                        <ThumbsUp className="w-4 h-4 mr-2" />
                        {comment.likes}
                      </Button>
                      <Button variant="ghost" size="sm" className="text-gray-300 hover:bg-gray-800">
                        <MessageCircle className="w-4 h-4 mr-2" />
                        Reply
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}