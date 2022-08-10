const textarea = document.getElementsByTagName('textarea')
const btnEncriptar = document.getElementById('encriptar')
const btnDesencriptar = document.getElementsByClassName('desencriptar')[0]
const muneco = document.getElementById('muneco')
const msjNoEncontrado = document.getElementsByClassName('no-encontrado')
const msjResultado = document.getElementById('msg-resultado')
const btnCopiar = document.getElementById('copiar-btn')
const llavesMap = new Map([
	['a', 'ai'],
	['e', 'enter'],
	['i', 'imes'],
	['o', 'ober'],
	['u', 'ufat'],
])
const checkIfStringHasSpecialChar = (string) => {
	let spChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
	return spChars.test(string) ? true : false
}
const copyToClipboard = (text) => {
	navigator.clipboard.writeText(text).then(() => console.log('hola'))
}
const encriptar = () => {
	btnCopiar.style.display = 'inline-block'
	const textoTextarea = textarea[0].value
	const specialCharecters = checkIfStringHasSpecialChar(textoTextarea)
	if (!specialCharecters) {
		let textoEncriptado = ''
		for (let i = 0; i < textoTextarea.length; i++) {
			textoEncriptado += llavesMap.get(textoTextarea[i]) ?? textoTextarea[i]
		}
		const validarMayusculas = textoEncriptado
			.split('')
			.every((char) => char === char.toLowerCase())
		if (validarMayusculas) return textoEncriptado
	}
	console.log(msjResultado.textContent)
}
const desencriptar = () => {
	let textoTextarea = textarea[0].value
	const specialCharecters = checkIfStringHasSpecialChar(textoTextarea)
	if (!specialCharecters) {
		const validarMayusculas = textoTextarea
			.split('')
			.every((char) => char === char.toLowerCase())
		if (validarMayusculas) {
			for (const [key, value] of llavesMap) {
				if (textoTextarea.includes(value)) {
					textoTextarea = textoTextarea.replaceAll(value, key)
				}
			}
			return textoTextarea
		}
	}
}
const mostarMensajeEncriptado = () => {
	const msjEncriptado = encriptar() ?? ''
	if (msjEncriptado.trim()) {
		msjResultado.textContent = msjEncriptado
		msjResultado.style.display = 'inline-block'
		muneco.style.display = 'none'
		msjNoEncontrado[0].style.display = 'none'
	}
}
const mostarMensajeDesencriptado = () => {
	const msjEncriptado = desencriptar() ?? ''
	if (msjEncriptado.trim()) {
		msjResultado.textContent = msjEncriptado
		msjResultado.style.display = 'inline-block'
		muneco.style.display = 'none'
		msjNoEncontrado[0].style.display = 'none'
	}
}
btnEncriptar.addEventListener('click', mostarMensajeEncriptado)
btnDesencriptar.addEventListener('click', mostarMensajeDesencriptado)
// btnCopiar.addEventListener('click', copyToClipboard(msjResultado.textContent))
