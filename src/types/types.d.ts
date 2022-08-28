export interface UserModel {
   _id: string;
   name: string;
   email: string;
   img: string;
   subscribers: number;
   subscribedUsers: string[];
   fromGoogle: boolean;
   createdAt: Date;
   updatedAt: Date;
}

export interface VideoModel {
   _id: string;
   userId: string;
   title: string;
   desc: string;
   imgUrl: string;
   videoUrl: string;
   views: number;
   tags: string;
   likes: string[];
   dislikes: string[];
   createdAt: Date;
   updatedAt: Date;
}

export interface CommentModel {
   _id: string;
   userId: string;
   videoId: string;
   desc: string;
   createdAt: Date;
   updatedAt: Date;
}
