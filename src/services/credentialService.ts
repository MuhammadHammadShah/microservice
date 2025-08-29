import bcrypt from "bcryptjs";

export class CredentialService {
    async comparePassword(userpassword: string, passwordhash: string) {
        return await bcrypt.compare(userpassword, passwordhash);
    }
}
