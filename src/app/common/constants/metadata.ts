/* Estrucutra que se parsea como JSON para los documentos */
export class Metadata {
  uploadDocuments: string = '['+
        '{' +
        '"name": "FormatoInscripcion",' +
        '"type": "file",' +
        '"description": "Formato de inscripcion al apoyo alimentario",' +
        '"file": "",' +
        '"required": "si",' +
        '"help": "Formulario SIGUD (firmado)"' +
        '},{' +
        '"name": "CartaADirectora",' +
        '"type": "file",' +
        '"description": "Carta de solicitud hacia la directora de bienestar",' +
        '"file": "",' +
        '"required": "si",' +
        '"help": "Carta de solicitud directora de Bienestar Astrid Ximena Parsons, explicando los motivos por los que solicita el apoyo alimentaio (firmado)"' +
        '},{' +
        '"name": "CertificadoEstrato",' +
        '"type": "file",' +
        '"description": "Certificado de estratificación",' +
        '"file": "",' +
        '"required": "si",' +
        '"help": "Certificado de estratificaión de la casa donde indique si es estrato 1, 2, 3, etc. (Vigencia un año)"' +
        '},{' +
        '"name": "FotocopiaReciboServicio",' +
        '"type": "file",' +
        '"description": "Fotocopia de recibo (agua, luz, gas o telefono)",' +
        '"file": "",' +
        '"required": "si",' +
        '"help": "Fotocopia de recibo público (agua, luz, telefono, gas, etc) que coincida con la dirección del certificado de estratificación (vigencia 3 meses)"' +
        '},{' +
        '"name": "CertificadoIngresos",' +
        '"type": "file",' +
        '"description": "Certificado de ingresos (propios o familiares)",' +
        '"file": "",' +
        '"required": "si",' +
        '"help": "Carta laboral de empresa donde indique cargo de ingresos mensuales, si el estudiante trabaja o si depende economicamente de sus padres. Carta Laboral Independiente: SI el estudiante es independiente o sus padres, deben elaborar una carta donde indique la actividad que hacen y los ingresos que reciben mensualmente, debe estar firmado con numero de cedula, dirección y telefono (del año actual a la solicitud). * Si presenta certificado de ingresos y retenciones debe ser maximo del semestre anterior a la solicitud"' +
        '},{' +
        '"name": "ReciboUniversidad",' +
        '"type": "file",' +
        '"description": "Recibo de la universidad",' +
        '"file": "",' +
        '"required": "si",' +
        '"help": "Fotocopia del recibo de matricula del semestre actual a la solicitud, con el timbre del banco"' +
        '},{' +
        '"name": "PersonasACargo",' +
        '"type": "file",' +
        '"description": "Personas a cargo",' +
        '"file": "",' +
        '"required": "no",' +
        '"help": "Si el estudiante tiene hijos, adjuntar registro civil de nacimiento"' +
        '},{' +
        '"name": "EmpleadorOArriendo",' +
        '"type": "file",' +
        '"description": "Contrato de arrendamiento",' +
        '"file": "",' +
        '"required": "no",' +
        '"help": "Si paga arriendo, presentar carta de arrendamiento o contrato (del año actual a la solicitud)"' +
        '},{' +
        '"name": "CondicionEspecial",' +
        '"type": "file",' +
        '"description": "Condición de población especial",' +
        '"file": "",' +
        '"required": "no",' +
        '"help": "Si esta en condición de desplazamiento, carta expedida por el ministerio del interior donde reporte su situación"' +
        '},{' +
        '"name": "CondicionDiscapacidad",' +
        '"type": "file",' +
        '"description": "Discapacidad fisica o mental",' +
        '"file": "",' +
        '"required": "no",' +
        '"help": "Certificado médico que avale su condición"' +
        '},{' +
        '"name": "PatologiaAlimenticia",' +
        '"type": "file",' +
        '"description": "Patología de nutrición o alimentaria",' +
        '"file": "",' +
        '"required": "no",' +
        '"help": "Certificado médico que avale su condición"' +
        '},{' +
        '"name": "DocumentoAdicional",' +
        '"type": "file",' +
        '"description": "Documentos adicionales",' +
        '"file": "",' +
        '"required": "si",' + 
        '"help": "Si considera que deba tenerse en cuenta algún otro documento, adjuntelo aqui"' +
        '}]'
}