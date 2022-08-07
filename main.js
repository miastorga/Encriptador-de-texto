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
const encriptar = () => {
	const textoTextarea = textarea[0].value
	console.log(validacionTextareaMayusculas(textoTextarea))
	let textoEncriptado = ''
	for (let i = 0; i < textoTextarea.length; i++) {
		textoEncriptado += llavesMap.get(textoTextarea[i]) ?? textoTextarea[i]
	}
	return textoEncriptado
}
const desencriptar = () => {
	let textoTextarea = textarea[0].value
	for (const [key, value] of llavesMap) {
		if (textoTextarea.includes(value)) {
			textoTextarea = textoTextarea.replaceAll(value, key)
		}
	}
	return textoTextarea
}
const copiar = (str) => {
	if (navigator && navigator.clipboard && navigator.clipboard.writeText)
		return navigator.clipboard.writeText(str)
	return Promise.reject('The Clipboard API is not available.')
}
const validacionTextareaMayusculas = (text) => {
	const textPorCaracter = text.split('')
	const checkForUpperCase = textPorCaracter.every(
		(caracter) => caracter != caracter.toUpperCase()
	)
	console.log(checkForUpperCase)
	if (checkForUpperCase) console.log(text)
}
validacionTextareaMayusculas('gat')
// const mostrarMensaje = (encriptado) => {
// 	const msjEncriptado = encriptado()
// 	msjResultado.textContent = msjEncriptado
// 	msjResultado.style.display = 'inline-block'
// 	muneco.style.display = 'none'
// 	msjNoEncontrado[0].style.display = 'none'
// }
const mostarMensajeEncriptado = () => {
	const msjEncriptado = encriptar()
	msjResultado.textContent = msjEncriptado
	msjResultado.style.display = 'inline-block'
	muneco.style.display = 'none'
	msjNoEncontrado[0].style.display = 'none'
}
const mostarMensajeDesencriptado = () => {
	msjResultado.style.display = 'inline-block'
	const msjEncriptado = desencriptar()
	msjResultado.textContent = msjEncriptado
	muneco.style.display = 'none'
	msjNoEncontrado[0].style.display = 'none'
}
btnEncriptar.addEventListener('click', mostarMensajeEncriptado)
btnDesencriptar.addEventListener('click', mostarMensajeDesencriptado)
