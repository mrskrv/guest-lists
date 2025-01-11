import "server-only";
import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

const secretKey = process.env.WOAH;
const encodedKey = new TextEncoder().encode(secretKey);

export type SessionPayload = {
	userId: string;
	username: string;
	expiresAt: Date;
};

export const createSession = async (userId: string, username: string) => {
	const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
	const session = await encrypt({ userId, username, expiresAt });

	(await cookies()).set("session", session, {
		httpOnly: true,
		secure: true,
		expires: expiresAt,
	});
};

export const deleteSession = async () => (await cookies()).delete("session");

export const encrypt = async (payload: SessionPayload) => {
	return new SignJWT(payload).setProtectedHeader({ alg: "HS256" }).setIssuedAt().setExpirationTime("7d").sign(encodedKey);
};

export const decrypt = async (session: string | undefined = "") => {
	try {
		const { payload } = await jwtVerify(session, encodedKey, { algorithms: ["HS256"] });
		return payload;
	} catch (error) {
		return { message: "Failed to verify session", error };
	}
};