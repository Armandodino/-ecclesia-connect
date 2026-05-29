export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  role: UserRole
  parishId: string
  familyId?: string
  phone?: string
  dateOfBirth?: Date
  address?: string
  createdAt: Date
  updatedAt: Date
}

export type UserRole =
  | "super_admin"
  | "bishop"
  | "priest"
  | "deacon"
  | "secretary"
  | "group_leader"
  | "member"

export interface Parish {
  id: string
  name: string
  diocese: string
  address: string
  phone: string
  email: string
  logo?: string
  coverImage?: string
  location: { lat: number; lng: number }
  createdAt: Date
}

export interface Announcement {
  id: string
  title: string
  content: string
  type: AnnouncementType
  authorId: string
  author: User
  parishId: string
  images?: string[]
  isPinned: boolean
  reactions: Reaction[]
  comments: Comment[]
  createdAt: Date
  updatedAt: Date
  expiresAt?: Date
}

export type AnnouncementType =
  | "general"
  | "deces"
  | "mariage"
  | "bapteme"
  | "confirmation"
  | "pelerinage"
  | "collecte"
  | "reunion"

export interface Reaction {
  id: string
  type: "like" | "pray" | "heart" | "amen"
  userId: string
  user: User
}

export interface Comment {
  id: string
  content: string
  authorId: string
  author: User
  createdAt: Date
  likes: number
}

export interface Event {
  id: string
  title: string
  description: string
  startDate: Date
  endDate: Date
  location?: string
  type: EventType
  parishId: string
  isRecurring: boolean
  recurrenceRule?: string
  liturgicalSeason?: string
  color?: string
}

export type EventType =
  | "mass"
  | "celebration"
  | "meeting"
  | "retreat"
  | "pilgrimage"
  | "festival"
  | "catechesis"

export interface Mass {
  id: string
  title: string
  scheduledAt: Date
  location: string
  celebrant: string
  intentions: MassIntention[]
  isLive: boolean
  streamUrl?: string
  parishId: string
}

export interface MassIntention {
  id: string
  intention: string
  requestedBy: string
  date: Date
  isFulfilled: boolean
}

export interface Sacrament {
  id: string
  type: SacramentType
  userId: string
  user: User
  date: Date
  celebrant: string
  location: string
  certificateUrl?: string
  witnesses?: string[]
  parishId: string
}

export type SacramentType = "bapteme" | "communion" | "confirmation" | "mariage"

export interface SacramentRequest {
  id: string
  type: SacramentType
  userId: string
  status: RequestStatus
  documents: Document[]
  notes?: string
  createdAt: Date
  updatedAt: Date
}

export type RequestStatus = "pending" | "validated" | "paid" | "scheduled" | "completed" | "rejected"

export interface Document {
  id: string
  name: string
  url: string
  type: string
  uploadedAt: Date
}

export interface Movement {
  id: string
  name: string
  description: string
  type: string
  leaderId: string
  leader: User
  members: User[]
  parishId: string
  logo?: string
  meetingDay?: string
  meetingTime?: string
  activities: Activity[]
}

export interface Activity {
  id: string
  title: string
  description: string
  date: Date
  type: string
}

export interface Donation {
  id: string
  amount: number
  currency: string
  method: PaymentMethod
  donorId?: string
  donor?: User
  campaignId?: string
  campaign?: Campaign
  message?: string
  receiptUrl?: string
  status: "pending" | "completed" | "failed"
  createdAt: Date
}

export type PaymentMethod = "orange_money" | "mtn_money" | "wave" | "card"

export interface Campaign {
  id: string
  title: string
  description: string
  goal: number
  raised: number
  startDate: Date
  endDate: Date
  parishId: string
  imageUrl?: string
}

export interface PrayerIntention {
  id: string
  content: string
  authorId: string
  author: User
  isAnonymous: boolean
  prayerCount: number
  createdAt: Date
}

export interface SpiritualEntry {
  id: string
  userId: string
  type: "journal" | "meditation" | "examen" | "rosary"
  title: string
  content: string
  mood?: string
  createdAt: Date
}

export interface CommunityPost {
  id: string
  content: string
  authorId: string
  author: User
  images?: string[]
  videoUrl?: string
  likes: number
  comments: Comment[]
  mentions: string[]
  createdAt: Date
}

export interface Message {
  id: string
  content: string
  senderId: string
  sender: User
  receiverId: string
  isRead: boolean
  createdAt: Date
}

export interface Notification {
  id: string
  title: string
  body: string
  type: string
  data?: Record<string, string>
  isRead: boolean
  createdAt: Date
}

export interface Family {
  id: string
  name: string
  members: User[]
  address?: string
  sector?: string
  parishId: string
}

export interface DashboardStats {
  totalMembers: number
  totalFamilies: number
  totalEvents: number
  totalDonations: number
  weeklyAttendance: number
  activeMovements: number
}

export interface LiturgicalDay {
  date: Date
  season: string
  celebration: string
  color: string
  readings: string[]
  saint?: string
}
