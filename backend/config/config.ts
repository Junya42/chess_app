import { ConfigProps } from "./config.interface";

export const config = (): ConfigProps => ({
	jwt : {
		jwtKey : process.env.JWT_KEY || "OUBLIE PAS LA CLEF POUR JWT"
	}
})