"use server";

// import { slugify } from "./utils";
// import { revalidatePath } from "next/cache";
// import { GuestTypeJSON } from "@/lib/definitions";

// import fs from "fs";
// import path from "path";
import { createSession, decrypt, deleteSession } from "@/lib/session";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
// import { z } from "zod";

// const schema = z.string().min(1).max(200);

// const filePath = path.join(process.cwd(), "data", "guests.json");

export type UserValueType = {
	username: string;
	password: string;
};

const testUser = {
	id: process.env.TEST_USER_ID,
	username: process.env.TEST_USER_USERNAME,
	password: process.env.TEST_USER_PASSWORD,
};

export type GuestValueType = {
	name: string;
	phone?: string | null | undefined;
};

export async function signin(values: UserValueType) {
	// Validate user credentials
	const { username, password } = values;
	if (username !== testUser.username || password !== testUser.password) return { success: false, message: "Invalid username or password" };

	await createSession(testUser.id!, testUser.username);
	return { success: true, message: "Login Success" };
}

export const signout = async () => {
	await deleteSession();
	redirect("/login");
};

export const getSession = async () => {
	const cookie = (await cookies()).get("session")?.value;
	const session = await decrypt(cookie);

	return session;
};
