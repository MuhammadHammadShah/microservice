import bcrypt from "bcrypt"

export class CredentialService {
    async comparePassword(userpassword: string, passwordhash: string) {
        return await bcrypt.compare(userpassword, passwordhash)
    }
}
