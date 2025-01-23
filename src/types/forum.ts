export type DiscussionCategory = 
  | 'taxation'
  | 'immigration'
  | 'career'
  | 'technical'
  | 'mentorship'
  | 'general';

export interface Discussion {
  id: string;
  title: string;
  content: string;
  category: DiscussionCategory;
  authorId: string;
  authorName: string;
  authorRole: 'mentor' | 'mentee';
  createdAt: string;
  updatedAt: string;
  replies: DiscussionReply[];
  likes: number;
  views: number;
}

export interface DiscussionReply {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  authorRole: 'mentor' | 'mentee';
  createdAt: string;
  isSolution?: boolean;
} 