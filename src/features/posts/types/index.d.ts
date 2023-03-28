export interface PostCreateParams {
  title: string;
  description: string;
  content: string;
  tags: string[];
}

export interface PostUpdateParams {
  id: string;
  title?: string;
  description?: string;
  content?: string;
  tags: string[];
}
