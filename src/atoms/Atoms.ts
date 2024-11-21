import { atom } from "recoil";
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();
export const moviesAtom = atom<JSX.Element[]>({
    key : 'moviesAtom',
    default : []
})
export const locationInput = atom<string>({
    key : 'locationInput',
    default : 'Location'
})
export const longitudeAtom = atom<number | null>({
    key : 'logitude',
    default: null
})
export const latitudeAtom = atom<number | null>({
    key : 'latitude',
    default: null
})
export const movieName = atom<string>({
    key : 'movieName',
    default : ''
})
export const showTiming = atom<string>({
    key : 'showTime',
    default : ''
})
export const theaterId = atom<number>({
    key : 'theaterId',
    default : 0
})
export const noOfSeats = atom<string>({
    key : "noOfSeats",
    default : "0"
})
interface SeatData {
    id: number;
    number: string;
    seatType: string;
    status: string;
    theaterId: number;
    showtimeId: number;
    createdAt: string;
    updatedAt: string;
  }
export  const userSeatData = atom<SeatData[]>({
    key : "userSeatData",
    default : []
})
export const userId = atom<number>({
       key : "userId",
       default : 0,
       effects_UNSTABLE: [persistAtom],
})
export const thearter = atom<string>({
    key : 'theater',
    default : ''
})
