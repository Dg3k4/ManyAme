const nodemailer = require("nodemailer")
const {google} = require("googleapis")

const {
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REFRESH_TOKEN,
    SMTP_USER,
    API_URL
} = process.env

const OAuth2 = google.auth.OAuth2

class MailService {

    constructor() {
        this.oauth2Client = new OAuth2(
            GOOGLE_CLIENT_ID,
            GOOGLE_CLIENT_SECRET,
            "https://developers.google.com/oauthplayground"
        )

        this.oauth2Client.setCredentials({
            refresh_token: GOOGLE_REFRESH_TOKEN,
        })

        this.accessToken = this.oauth2Client.getAccessToken()

        this.transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                type: "OAuth2",
                user: SMTP_USER,
                clientId: GOOGLE_CLIENT_ID,
                clientSecret: GOOGLE_CLIENT_SECRET,
                refreshToken: GOOGLE_REFRESH_TOKEN,
                accessToken: this.accessToken
            }
        })
    }

    async sendActivationMail(to, link) {
        try {
            await this.transporter.sendMail({
                from: `ManyAme <${SMTP_USER}>`,
                to,
                subject: `Активация аккаунта на ${API_URL}`,
                html: `
                    <div>
                        <h1>Для активации аккаунта перейдите по этой ссылке</h1>
                        <a href="${link}">${link}</a>
                    </div>
                `,
            });
            console.log('Письмо успешно отправлено');
        } catch (error) {
            console.error('Ошибка при отправке письма:', error);
            throw new Error('Не удалось отправить письмо с активацией.');
        }
    }
}

module.exports = new MailService()