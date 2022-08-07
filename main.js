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
const checkIfStringHasSpecialChar = (_string) => {
	let spChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/
	if (spChars.test(_string)) {
		return true
	} else {
		return false
	}
}
const encriptar = () => {
	const textoTextarea = textarea[0].value
	const specialCharecters = checkIfStringHasSpecialChar(textoTextarea)
	if (!specialCharecters) {
		let textoEncriptado = ''
		for (let i = 0; i < textoTextarea.length; i++) {
			textoEncriptado += llavesMap.get(textoTextarea[i]) ?? textoTextarea[i]
		}
		const textoEncriptadoArray = textoEncriptado.split('')
		const validarMayusculas = textoEncriptadoArray.every(
			(caracter) => caracter === caracter.toLowerCase()
		)
		if (validarMayusculas) return textoEncriptado
	}
}
const desencriptar = () => {
	let textoTextarea = textarea[0].value
	const specialCharecters = checkIfStringHasSpecialChar(textoTextarea)
	if (!specialCharecters) {
		const textoEncriptadoArray = textoTextarea.split('')
		const validarMayusculas = textoEncriptadoArray.every(
			(caracter) => caracter === caracter.toLowerCase()
		)
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
// const copiar = (str) => {
// 	if (navigator && navigator.clipboard && navigator.clipboard.writeText)
// 		return navigator.clipboard.writeText(str)
// 	return Promise.reject('The Clipboard API is not available.')
// }

// const mostrarMensaje = (functionEncriptar) => {
// 	const msjEncriptado = functionEncriptar() ?? ''
// 	if (msjEncriptado.trim()) {
// 		msjResultado.textContent = msjEncriptado
// 		msjResultado.style.display = 'inline-block'
// 		muneco.style.display = 'none'
// 		msjNoEncontrado[0].style.display = 'none'
// 	}
// }
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
