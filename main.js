const textarea = document.getElementsByTagName('textarea')
const btnEncriptar = document.getElementById('encriptar')
const btnDesencriptar = document.getElementsByClassName('desencriptar')[0]
const muneco = document.getElementById('muneco')
const msjNoEncontrado = document.getElementsByClassName('no-encontrado')
const msjResultadoContainer = document.getElementsByClassName(
	'msg-resultado-container'
)[0]
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
const copyToClipboard = () =>
	navigator.clipboard.writeText(msjResultado.textContent)
const encriptar = () => {
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
				textoTextarea = textoTextarea.replaceAll(value, key)
			}
		}
		return textoTextarea
	}
}
const mostarMensajeEncriptado = () => {
	const msjEncriptado = encriptar() ?? ''
	if (msjEncriptado.trim()) {
		msjResultadoContainer.style.display = 'inline-block'
		msjResultado.textContent = msjEncriptado
		muneco.style.display = 'none'
		msjNoEncontrado[0].style.display = 'none'
		btnCopiar.style.display = 'inline-block'
	}
}
const mostarMensajeDesencriptado = () => {
	const msjDesencriptado = desencriptar() ?? ''
	msjResultado.textContent = msjDesencriptado
}
btnEncriptar.addEventListener('click', mostarMensajeEncriptado)
btnDesencriptar.addEventListener('click', mostarMensajeDesencriptado)
btnCopiar.addEventListener('click', copyToClipboard)
