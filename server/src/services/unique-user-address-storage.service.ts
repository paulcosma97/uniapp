import MemoryStorage from "./memory-storage.interface";
import LocalMemoryStorage from "./local-memory-storage";
import {CourseAttendance} from "../models/course-attendance.model";

const storage: MemoryStorage<string, string> = new LocalMemoryStorage();

function computeValue(userId: number, attendance: CourseAttendance): string {
    return `${userId}-${attendance.id}`;
}

export async function setUserMACAddress(userId: number, attendance: CourseAttendance, macAddress: string): Promise<void> {
    await storage.set(macAddress, computeValue(userId, attendance));
}

export async function macAddressAlreadyUsed(macAddress: string): Promise<boolean> {
    return storage.exists(macAddress);
}

export async function clearAllMACAddresses(): Promise<void> {
    await storage.removeAll();
}