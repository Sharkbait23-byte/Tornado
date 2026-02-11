// Estado global de la aplicación
const courseState = {
    currentSection: 'que-es-python',
    progress: 0,
    viewedSections: new Set(['que-es-python']),
    totalSections: 0,
    exams: {
        'examen-1': {
            completed: false,
            score: 0,
            attempts: 0
        },
        'examen-2': {
            completed: false,
            score: 0,
            attempts: 0
        }
    },
    certificateRequested: false
};

// Contenido del curso
const courseContent = {
    'que-es-python': `
        <h1>¿Qué es Python?</h1>
        <p>Python es un lenguaje de programación interpretado, de alto nivel y de propósito general. Fue creado en 1991 por Guido van Rossum y está mantenido por el equipo de Python Software Foundation. Python admite el paradigma de programación multiparadigma, programación orientada a objetos, programación funcional, etc.</p>
        <p>Python es un lenguaje de propósito general, que puede ser usado para desarrollar aplicaciones de escritorio, aplicaciones web, servidores web, y muchas otras cosas más.</p>
    `,
    'tipos-de-datos': `
        <h1>Tipos de datos</h1>
        <p>Python maneja varios tipos de datos básicos:</p>
        <ul>
            <li><strong>int</strong>: Para números enteros, ya sean positivos o negativos</li>
            <li><strong>float</strong>: Para números con precisión decimal, pueden ser negativos o positivos</li>
            <li><strong>str</strong>: Para cadenas de texto</li>
            <li><strong>bool</strong>: Para valores booleanos (True o False)</li>
            <li><strong>list</strong>: Para listas ordenadas y modificables</li>
            <li><strong>tuple</strong>: Para listas ordenadas e inmutables</li>
            <li><strong>dict</strong>: Para diccionarios de pares clave-valor</li>
            <li><strong>set</strong>: Para conjuntos de elementos únicos</li>
        </ul>
        <div class="code-block">
            <button class="copy-btn">Copiar</button>
            <pre>
# int
var1=25

# float
var2=25.50

# string
var3="Hola Mundo"

# boolean
var4=True

# list
var5=[1, 2, 3, 4, 5]

# tuple
var6=(1, 2, 3, 4, 5)

# dictionary
var7={"nombre": "Juan", "edad": 30}

# set
var8={1, 2, 3, 4, 5}
            </pre>
        </div>
    `,
    'instalacion': `
        <h1>Instalación</h1>
        <p>Para comenzar a utilizar Python, sigue estos pasos:</p>
        <ol>
            <li>Visita el sitio oficial: <a href="https://www.python.org/downloads/" target="_blank">https://www.python.org/downloads/</a></li>
            <li>Descarga la versión correspondiente a tu sistema operativo (disponible para Windows, Linux y macOS)</li>
            <li>Ejecuta el archivo de instalación y sigue las instrucciones en pantalla</li>
            <li>Una vez instalado, abre tu editor de código para iniciar</li>
        </ol>
        <h2>Verificar la instalación</h2>
        <p>Para verificar que Python se ha instalado correctamente, abre una terminal o símbolo del sistema y escribe:</p>
        <div class="code-block">
            <button class="copy-btn">Copiar</button>
            <pre>
python --version
            </pre>
        </div>
        <p>Deberías ver la versión de Python que has instalado.</p>
    `,
    'if-else': `
        <h1>Condicionales If-Else</h1>
        <p>Las estructuras condicionales permiten ejecutar diferentes bloques de código según se cumplan ciertas condiciones. La estructura básica es:</p>
        <div class="code-block">
            <button class="copy-btn">Copiar</button>
            <pre>
if condicion:
# código si la condición es verdadera
else:
# código si la condición es falsa
            </pre>
        </div>
        <p>Ejemplo:</p>
        <div class="code-block">
            <button class="copy-btn">Copiar</button>
            <pre>
edad = 18

if edad >= 18:
print("Eres mayor de edad")
else:
print("Eres menor de edad")
            </pre>
        </div>
    `,
    'elif': `
        <h1>Condicionales Elif</h1>
        <p>La palabra clave "elif" es una abreviatura de "else if" y permite comprobar múltiples condiciones de forma secuencial:</p>
        <div class="code-block">
            <button class="copy-btn">Copiar</button>
            <pre>
nota = 85

if nota >= 90:
print("Sobresaliente")
elif nota >= 80:
print("Notable")
elif nota >= 70:
print("Bien")
elif nota >= 60:
print("Suficiente")
else:
print("Insuficiente")
            </pre>
        </div>
        <p>En este ejemplo, Python evalúa cada condición en orden. En cuanto encuentra una condición verdadera, ejecuta el bloque asociado y sale de toda la estructura condicional.</p>
    `,
    'operadores-logicos': `
        <h1>Operadores lógicos</h1>
        <p>Python proporciona operadores lógicos para combinar condiciones:</p>
        <ul>
            <li><strong>and</strong>: Devuelve True si ambas condiciones son verdaderas</li>
            <li><strong>or</strong>: Devuelve True si al menos una condición es verdadera</li>
            <li><strong>not</strong>: Invierte el resultado, True se convierte en False y viceversa</li>
        </ul>
        <div class="code-block">
            <button class="copy-btn">Copiar</button>
            <pre>
edad = 25
tiene_licencia = True

if edad >= 18 and tiene_licencia:
print("Puede conducir")
else:
print("No puede conducir")

temperatura = 10
lluvia = True

if temperatura < 15 or lluvia:
print("Lleva abrigo")
else:
print("No necesitas abrigo")

esta_abierto = False

if not esta_abierto:
print("La tienda está cerrada")
else:
print("La tienda está abierta")
            </pre>
        </div>
    `,
    'listas': `
        <h1>Listas</h1>
        <p>Las listas son colecciones ordenadas y modificables que permiten elementos duplicados. Se crean utilizando corchetes []:</p>
        <div class="code-block">
            <button class="copy-btn">Copiar</button>
            <pre>
# Crear una lista
frutas = ["manzana", "banana", "cereza", "naranja"]

# Acceder a elementos
primera_fruta = frutas[0]  # manzana
ultima_fruta = frutas[-1]  # naranja

# Modificar elementos
frutas[1] = "pera"

# Añadir elementos
frutas.append("uva")

# Eliminar elementos
frutas.remove("cereza")

# Longitud de la lista
num_frutas = len(frutas)

# Iterar sobre una lista
for fruta in frutas:
print(fruta)
            </pre>
        </div>
        <p>Las listas son muy versátiles y una de las estructuras de datos más utilizadas en Python.</p>
    `,
    'tuplas': `
        <h1>Tuplas</h1>
        <p>Las tuplas son colecciones ordenadas e inmutables. Se crean utilizando paréntesis ():</p>
        <div class="code-block">
            <button class="copy-btn">Copiar</button>
            <pre>
# Crear una tupla
coordenadas = (10, 20)

# Acceder a elementos
x = coordenadas[0]  # 10
y = coordenadas[1]  # 20

# Tuplas son inmutables
# coordenadas[0] = 15  # Esto causaría un error

# Longitud de la tupla
dimension = len(coordenadas)

# Desempaquetar tupla
x, y = coordenadas

# Tupla con un solo elemento
singleton = (42,)  # La coma es importante
            </pre>
        </div>
        <p>Las tuplas son útiles cuando quieres asegurarte de que los datos no cambien.</p>
    `,
    'diccionarios': `
        <h1>Diccionarios</h1>
        <p>Los diccionarios son colecciones desordenadas de pares clave-valor. Se crean utilizando llaves {}:</p>
        <div class="code-block">
            <button class="copy-btn">Copiar</button>
            <pre>
# Crear un diccionario
persona = {
"nombre": "Ana",
"edad": 28,
"ciudad": "Madrid"
}

# Acceder a valores
nombre = persona["nombre"]  # Ana

# También se puede usar el método get
edad = persona.get("edad")  # 28

# Modificar valores
persona["ciudad"] = "Barcelona"

# Añadir nuevos pares clave-valor
persona["profesion"] = "Ingeniera"

# Eliminar pares
del persona["edad"]

# Iterar sobre claves
for clave in persona:
print(clave, persona[clave])

# Iterar sobre items (pares clave-valor)
for clave, valor in persona.items():
print(clave, valor)
            </pre>
        </div>
        <p>Los diccionarios son muy útiles para representar objetos con propiedades.</p>
    `,
    'examen-1': `
        <h1>Examen 1: Fundamentos de Python</h1>
        <div id="exam-results" class="hidden"></div>
        <div id="exam-container-1" class="exam-container">
            <form id="exam-form-1">
                <div class="question">
                    <p>1. ¿Qué tipo de dato usarías para almacenar un número decimal?</p>
                    <div class="options">
                        <div class="option">
                            <input type="radio" name="q1" id="q1-a" value="a">
                            <label for="q1-a">int</label>
                        </div>
                        <div class="option">
                            <input type="radio" name="q1" id="q1-b" value="b">
                            <label for="q1-b">float</label>
                        </div>
                        <div class="option">
                            <input type="radio" name="q1" id="q1-c" value="c">
                            <label for="q1-c">str</label>
                        </div>
                        <div class="option">
                            <input type="radio" name="q1" id="q1-d" value="d">
                            <label for="q1-d">bool</label>
                        </div>
                    </div>
                </div>
                
                <div class="question">
                    <p>2. ¿Cuál es el operador de asignación en Python?</p>
                    <div class="options">
                        <div class="option">
                            <input type="radio" name="q2" id="q2-a" value="a">
                            <label for="q2-a">==</label>
                        </div>
                        <div class="option">
                            <input type="radio" name="q2" id="q2-b" value="b">
                            <label for="q2-b">=</label>
                        </div>
                        <div class="option">
                            <input type="radio" name="q2" id="q2-c" value="c">
                            <label for="q2-c">:=</label>
                        </div>
                        <div class="option">
                            <input type="radio" name="q2" id="q2-d" value="d">
                            <label for="q2-d">::</label>
                        </div>
                    </div>
                </div>
                
                <div class="question">
                    <p>3. ¿Qué estructura de datos es mutable y mantiene un orden?</p>
                    <div class="options">
                        <div class="option">
                            <input type="radio" name="q3" id="q3-a" value="a">
                            <label for="q3-a">tuple</label>
                        </div>
                        <div class="option">
                            <input type="radio" name="q3" id="q3-b" value="b">
                            <label for="q3-b">list</label>
                        </div>
                        <div class="option">
                            <input type="radio" name="q3" id="q3-c" value="c">
                            <label for="q3-c">set</label>
                        </div>
                        <div class="option">
                            <input type="radio" name="q3" id="q3-d" value="d">
                            <label for="q3-d">dict</label>
                        </div>
                    </div>
                </div>
                
                <div class="question">
                    <p>4. ¿Qué devuelve la siguiente expresión? 10 > 5 and 7 < 3</p>
                    <div class="options">
                        <div class="option">
                            <input type="radio" name="q4" id="q4-a" value="a">
                            <label for="q4-a">True</label>
                        </div>
                        <div class="option">
                            <input type="radio" name="q4" id="q4-b" value="b">
                            <label for="q4-b">False</label>
                        </div>
                        <div class="option">
                            <input type="radio" name="q4" id="q4-c" value="c">
                            <label for="q4-c">None</label>
                        </div>
                        <div class="option">
                            <input type="radio" name="q4" id="q4-d" value="d">
                            <label for="q4-d">Error</label>
                        </div>
                    </div>
                </div>
                
                <div class="question">
                    <p>5. ¿En qué año fue creado Python?</p>
                    <div class="options">
                        <div class="option">
                            <input type="radio" name="q5" id="q5-a" value="a">
                            <label for="q5-a">1989</label>
                        </div>
                        <div class="option">
                            <input type="radio" name="q5" id="q5-b" value="b">
                            <label for="q5-b">1991</label>
                        </div>
                        <div class="option">
                            <input type="radio" name="q5" id="q5-c" value="c">
                            <label for="q5-c">1995</label>
                        </div>
                        <div class="option">
                            <input type="radio" name="q5" id="q5-d" value="d">
                            <label for="q5-d">2000</label>
                        </div>
                    </div>
                </div>
                
                <button type="submit">Enviar respuestas</button>
            </form>
        </div>
    `,
    'definir-funciones': `
        <h1>Definir funciones</h1>
        <p>En Python, las funciones se definen utilizando la palabra clave <code>def</code>, seguida del nombre de la función y paréntesis:</p>
        <div class="code-block">
            <button class="copy-btn">Copiar</button>
            <pre>
def saludar():
print("¡Hola, mundo!")

# Llamar a la función
saludar()
            </pre>
        </div>
        <p>Las funciones permiten organizar el código en bloques reutilizables, facilitan el mantenimiento y mejoran la legibilidad.</p>
    `,
    'argumentos': `
        <h1>Argumentos de funciones</h1>
        <p>Las funciones pueden recibir datos mediante argumentos:</p>
        <div class="code-block">
            <button class="copy-btn">Copiar</button>
            <pre>
# Función con argumentos
def saludar_persona(nombre):
print(f"¡Hola, {nombre}!")

saludar_persona("María")  # ¡Hola, María!

# Argumentos posicionales y con nombre
def describir_persona(nombre, edad):
print(f"{nombre} tiene {edad} años.")

# Llamadas equivalentes
describir_persona("Juan", 30)
describir_persona(nombre="Juan", edad=30)
describir_persona(edad=30, nombre="Juan")

# Argumentos con valores por defecto
def saludar(nombre, mensaje="Hola"):
print(f"{mensaje}, {nombre}")

saludar("Ana")  # Hola, Ana
saludar("Pedro", "Buenos días")  # Buenos días, Pedro

# Número variable de argumentos
def sumar(*numeros):
total = 0
for numero in numeros:
total += numero
return total

print(sumar(1, 2, 3, 4, 5))  # 15
            </pre>
        </div>
    `,
    'return': `
        <h1>Return en funciones</h1>
        <p>La declaración <code>return</code> se utiliza para que una función devuelva un valor:</p>
        <div class="code-block">
            <button class="copy-btn">Copiar</button>
            <pre>
def sumar(a, b):
return a + b

resultado = sumar(5, 3)  # resultado = 8
// Continuation of the JavaScript for the course page

// Multiple return values
def calcular_estadisticas(numeros):
total = sum(numeros)
promedio = total / len(numeros)
maximo = max(numeros)
minimo = min(numeros)
return total, promedio, maximo, minimo

# Desempaquetar los valores retornados
total, promedio, maximo, minimo = calcular_estadisticas([1, 2, 3, 4, 5])
            </pre>
        </div>
        <p>Las funciones pueden devolver múltiples valores como una tupla, que luego puede ser desempaquetada.</p>
    `,
    'try-except': `
        <h1>Try-Except</h1>
        <p>Python utiliza try/except para manejar excepciones y errores:</p>
        <div class="code-block">
            <button class="copy-btn">Copiar</button>
            <pre>
# Manejo básico de excepciones
try:
resultado = 10 / 0
except:
print("Ocurrió un error")

# Capturar tipos específicos de excepciones
try:
numero = int("abc")
except ValueError:
print("No se pudo convertir a entero")

# Múltiples bloques except
try:
archivo = open("noexiste.txt", "r")
contenido = archivo.read()
archivo.close()
except FileNotFoundError:
print("El archivo no existe")
except PermissionError:
print("No tienes permiso para acceder al archivo")

# Bloque else y finally
try:
numero = int("123")
except ValueError:
print("Entrada inválida")
else:
print("La conversión fue exitosa")
finally:
print("Este bloque siempre se ejecuta")
            </pre>
        </div>
    `,
    'tipos-errores': `
        <h1>Tipos de errores</h1>
        <p>Python tiene varios tipos de excepciones incorporadas:</p>
        <ul>
            <li><strong>SyntaxError</strong>: Error en la sintaxis del programa</li>
            <li><strong>TypeError</strong>: Operación aplicada a un objeto de tipo inapropiado</li>
            <li><strong>ValueError</strong>: Operación con un valor inapropiado</li>
            <li><strong>NameError</strong>: Variable no definida</li>
            <li><strong>IndexError</strong>: Índice fuera de rango</li>
            <li><strong>KeyError</strong>: Clave no encontrada en un diccionario</li>
            <li><strong>FileNotFoundError</strong>: Archivo no encontrado</li>
            <li><strong>ZeroDivisionError</strong>: División por cero</li>
        </ul>
        <div class="code-block">
            <button class="copy-btn">Copiar</button>
            <pre>
# Ejemplos de diferentes tipos de errores

# TypeError
try:
resultado = "texto" + 5
except TypeError as e:
print(f"Error de tipo: {e}")

# ValueError
try:
numero = int("texto")
except ValueError as e:
print(f"Error de valor: {e}")

# IndexError
try:
lista = [1, 2, 3]
elemento = lista[10]
except IndexError as e:
print(f"Error de índice: {e}")

# KeyError
try:
diccionario = {"a": 1, "b": 2}
valor = diccionario["c"]
except KeyError as e:
print(f"Error de clave: {e}")
            </pre>
        </div>
        <p>Conocer los tipos de errores te permite manejarlos de manera específica.</p>
    `,
    'importar': `
        <h1>Importar módulos</h1>
        <p>Los módulos son archivos que contienen código Python que puedes reutilizar. Python tiene una biblioteca estándar con muchos módulos útiles:</p>
        <div class="code-block">
            <button class="copy-btn">Copiar</button>
            <pre>
# Importar un módulo completo
import math

# Usar funciones del módulo
radio = 5
area = math.pi * math.pow(radio, 2)
print(f"El área del círculo es {area}")

# Importar funciones específicas
from random import randint, choice

# Usar las funciones directamente
numero_aleatorio = randint(1, 10)
print(f"Número aleatorio: {numero_aleatorio}")

elementos = ["agua", "fuego", "tierra", "aire"]
elemento_aleatorio = choice(elementos)
print(f"Elemento aleatorio: {elemento_aleatorio}")

# Importar con alias
import datetime as dt

ahora = dt.datetime.now()
print(f"Fecha y hora actual: {ahora}")
            </pre>
        </div>
    `,
    'crear-modulos': `
        <h1>Crear módulos</h1>
        <p>También puedes crear tus propios módulos. Un módulo es simplemente un archivo .py con código Python:</p>
        <p>Ejemplo de un módulo personalizado (guardado como <code>calculadora.py</code>):</p>
        <div class="code-block">
            <button class="copy-btn">Copiar</button>
            <pre>
# Archivo: calculadora.py

def sumar(a, b):
return a + b

def restar(a, b):
return a - b

def multiplicar(a, b):
return a * b

def dividir(a, b):
if b == 0:
raise ValueError("No se puede dividir por cero")
return a / b

PI = 3.14159
            </pre>
        </div>
        <p>Para usar este módulo en otro archivo:</p>
        <div class="code-block">
            <button class="copy-btn">Copiar</button>
            <pre>
# Importar el módulo completo
import calculadora

resultado = calculadora.sumar(5, 3)
print(f"5 + 3 = {resultado}")

# Importar funciones específicas
from calculadora import multiplicar, PI

producto = multiplicar(4, 6)
print(f"4 * 6 = {producto}")
print(f"PI = {PI}")
            </pre>
        </div>
    `,
    'examen-2': `
        <h1>Examen 2: Python Avanzado</h1>
        <div id="exam-results" class="hidden"></div>
        <div id="exam-container-2" class="exam-container">
            <form id="exam-form-2">
                <div class="question">
                    <p>1. ¿Cuál es la manera correcta de definir una función en Python?</p>
                    <div class="options">
                        <div class="option">
                            <input type="radio" name="q1" id="q1-a" value="a">
                            <label for="q1-a">function nombre():</label>
                        </div>
                        <div class="option">
                            <input type="radio" name="q1" id="q1-b" value="b">
                            <label for="q1-b">def nombre():</label>
                        </div>
                        <div class="option">
                            <input type="radio" name="q1" id="q1-c" value="c">
                            <label for="q1-c">define nombre():</label>
                        </div>
                        <div class="option">
                            <input type="radio" name="q1" id="q1-d" value="d">
                            <label for="q1-d">func nombre():</label>
                        </div>
                    </div>
                </div>
                
                <div class="question">
                    <p>2. ¿Qué bloque se ejecuta siempre en un try/except, ocurra o no un error?</p>
                    <div class="options">
                        <div class="option">
                            <input type="radio" name="q2" id="q2-a" value="a">
                            <label for="q2-a">try</label>
                        </div>
                        <div class="option">
                            <input type="radio" name="q2" id="q2-b" value="b">
                            <label for="q2-b">except</label>
                        </div>
                        <div class="option">
                            <input type="radio" name="q2" id="q2-c" value="c">
                            <label for="q2-c">else</label>
                        </div>
                        <div class="option">
                            <input type="radio" name="q2" id="q2-d" value="d">
                            <label for="q2-d">finally</label>
                        </div>
                    </div>
                </div>
                
                <div class="question">
                    <p>3. ¿Qué error ocurre cuando intentas acceder a una clave que no existe en un diccionario?</p>
                    <div class="options">
                        <div class="option">
                            <input type="radio" name="q3" id="q3-a" value="a">
                            <label for="q3-a">ValueError</label>
                        </div>
                        <div class="option">
                            <input type="radio" name="q3" id="q3-b" value="b">
                            <label for="q3-b">KeyError</label>
                        </div>
                        <div class="option">
                            <input type="radio" name="q3" id="q3-c" value="c">
                            <label for="q3-c">IndexError</label>
                        </div>
                        <div class="option">
                            <input type="radio" name="q3" id="q3-d" value="d">
                            <label for="q3-d">TypeError</label>
                        </div>
                    </div>
                </div>
                
                <div class="question">
                    <p>4. ¿Cómo se importa un módulo con un alias en Python?</p>
                    <div class="options">
                        <div class="option">
                            <input type="radio" name="q4" id="q4-a" value="a">
                            <label for="q4-a">import modulo as alias</label>
                        </div>
                        <div class="option">
                            <input type="radio" name="q4" id="q4-b" value="b">
                            <label for="q4-b">from modulo import alias</label>
                        </div>
                        <div class="option">
                            <input type="radio" name="q4" id="q4-c" value="c">
                            <label for="q4-c">import alias for modulo</label>
                        </div>
                        <div class="option">
                            <input type="radio" name="q4" id="q4-d" value="d">
                            <label for="q4-d">import modulo with alias</label>
                        </div>
                    </div>
                </div>
                
                <div class="question">
                    <p>5. ¿Cuál es el valor de "resultado" después de ejecutar el siguiente código?<br>
                    def funcion(a, b=2): return a * b<br>
                    resultado = funcion(3)</p>
                    <div class="options">
                        <div class="option">
                            <input type="radio" name="q5" id="q5-a" value="a">
                            <label for="q5-a">3</label>
                        </div>
                        <div class="option">
                            <input type="radio" name="q5" id="q5-b" value="b">
                            <label for="q5-b">6</label>
                        </div>
                        <div class="option">
                            <input type="radio" name="q5" id="q5-c" value="c">
                            <label for="q5-c">2</label>
                        </div>
                        <div class="option">
                            <input type="radio" name="q5" id="q5-d" value="d">
                            <label for="q5-d">Error</label>
                        </div>
                    </div>
                </div>
                
                <button type="submit">Enviar respuestas</button>
            </form>
        </div>
    `,
    'certificado': `
        <h1>Certificado de Curso</h1>
        <div id="certificate-status"></div>
        <div id="certificate-container" class="certificate-container">
            <h2>Certificado de Finalización</h2>
            <p>Este certificado acredita que</p>
            <h3><span id="student-name">Estudiante</span></h3>
            <p>ha completado con éxito el curso</p>
            <h3>Fundamentos de Python</h3>
            <p>con una calificación promedio de <span id="average-score">0</span>%</p>
            <p>Fecha: <span id="certificate-date"></span></p>
            <button id="downloadCertificate">Descargar Certificado</button>
        </div>
    `
};

// DOM Elements
const mainContent = document.getElementById('mainContent');
const progressBar = document.getElementById('progressBar');
const moduleList = document.getElementById('moduleList');

// Inicializar conteo total de secciones
courseState.totalSections = Object.keys(courseContent).length;

// Función para cargar contenido
function loadContent(section) {
    if (courseContent[section]) {
        mainContent.innerHTML = courseContent[section];
        courseState.currentSection = section;
        
        // Marcar sección como vista
        courseState.viewedSections.add(section);
        
        // Actualizar progreso
        updateProgress();
        
        // Marcar la sección activa en la barra lateral
        updateActiveSection(section);
        
        // Inicializar eventos específicos de la sección
        initializeSectionEvents(section);
        
        // Enviar progreso al servidor
        sendProgressToServer();
        
        // Scroll al inicio
        window.scrollTo(0, 0);
    }
}

// Función para actualizar la barra de progreso
function updateProgress() {
    const progress = (courseState.viewedSections.size / courseState.totalSections) * 100;
    courseState.progress = progress;
    progressBar.style.width = `${progress}%`;
}

// Función para actualizar la sección activa en la barra lateral
function updateActiveSection(section) {
    // Resetear todas las secciones
    document.querySelectorAll('.topic').forEach(topic => {
        topic.classList.remove('active');
    });
    
    // Activar la sección actual
    const currentTopic = document.querySelector(`.topic[data-section="${section}"]`);
    if (currentTopic) {
        currentTopic.classList.add('active');
        
        // Asegurarse de que el módulo padre esté expandido
        const parentModule = currentTopic.closest('.module-content');
        if (parentModule) {
            parentModule.classList.add('active');
            const moduleTitle = parentModule.previousElementSibling;
            if (moduleTitle) {
                moduleTitle.querySelector('span').textContent = '▼';
            }
        }
    }
}

// Función para inicializar eventos específicos de sección
function initializeSectionEvents(section) {
    // Inicializar botones de copiar
    document.querySelectorAll('.copy-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const codeBlock = this.nextElementSibling;
            const code = codeBlock.textContent;
            navigator.clipboard.writeText(code.trim());
            
            // Efecto visual
            const originalText = this.textContent;
            this.textContent = "¡Copiado!";
            setTimeout(() => {
                this.textContent = originalText;
            }, 1500);
        });
    });
    
    // Inicializar formularios de examen
    if (section === 'examen-1') {
        initializeExam('exam-form-1', 'examen-1');
    } else if (section === 'examen-2') {
        initializeExam('exam-form-2', 'examen-2');
    } else if (section === 'certificado') {
        initializeCertificate();
    }
}

// Función para inicializar formularios de examen
function initializeExam(formId, examId) {
    const form = document.getElementById(formId);
    const resultsDiv = document.getElementById('exam-results');
    
    // Mostrar resultados si ya se completó el examen
    if (courseState.exams[examId].completed) {
        resultsDiv.classList.remove('hidden');
        resultsDiv.innerHTML = `
            <h3>Resultados del examen</h3>
            <p>Puntuación: ${courseState.exams[examId].score}%</p>
            <p>Intentos: ${courseState.exams[examId].attempts}</p>
        `;
        
        // Deshabilitar el formulario si ya se ha completado
        const inputs = form.querySelectorAll('input');
        inputs.forEach(input => {
            input.disabled = true;
        });
        
        const submitButton = form.querySelector('button[type="submit"]');
        submitButton.disabled = true;
        submitButton.classList.add('disabled');
    }
    
    // Manejar envío del formulario
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Respuestas correctas (ejemplos)
        const correctAnswers = {
            'examen-1': ['b', 'b', 'b', 'b', 'b'],
            'examen-2': ['b', 'd', 'b', 'a', 'b']
        };
        
        // Obtener respuestas del usuario
        const userAnswers = [];
        for (let i = 1; i <= 5; i++) {
            const selected = form.querySelector(`input[name="q${i}"]:checked`);
            userAnswers.push(selected ? selected.value : null);
        }
        
        // Calcular puntuación
        let correctCount = 0;
        userAnswers.forEach((answer, index) => {
            if (answer === correctAnswers[examId][index]) {
                correctCount++;
            }
        });
        
        const score = Math.round((correctCount / 5) * 100);
        
        // Actualizar estado del examen
        courseState.exams[examId].completed = true;
        courseState.exams[examId].score = score;
        courseState.exams[examId].attempts++;
        
        // Mostrar resultados
        resultsDiv.classList.remove('hidden');
        resultsDiv.innerHTML = `
            <h3>Resultados del examen</h3>
            <p>Puntuación: ${score}%</p>
            <p>Respuestas correctas: ${correctCount} de 5</p>
            <p>Intentos: ${courseState.exams[examId].attempts}</p>
        `;
        
        // Enviar resultados al servidor
        sendExamResults(examId, score);
        
        // Deshabilitar el formulario si la puntuación es aprobada (>=60%)
        if (score >= 60) {
            const inputs = form.querySelectorAll('input');
            inputs.forEach(input => {
                input.disabled = true;
            });
            
            const submitButton = form.querySelector('button[type="submit"]');
            submitButton.disabled = true;
            submitButton.classList.add('disabled');
        }
    });
}

// Función para inicializar la página de certificado
function initializeCertificate() {
    const statusDiv = document.getElementById('certificate-status');
    const certificateContainer = document.getElementById('certificate-container');
    const downloadButton = document.getElementById('downloadCertificate');
    const studentName = document.getElementById('student-name');
    const averageScore = document.getElementById('average-score');
    const certificateDate = document.getElementById('certificate-date');
    
    // Verificar si se cumplen los requisitos para el certificado
    const exam1Completed = courseState.exams['examen-1'].completed;
    const exam2Completed = courseState.exams['examen-2'].completed;
    const exam1Passed = courseState.exams['examen-1'].score >= 60;
    const exam2Passed = courseState.exams['examen-2'].score >= 60;
    const progressComplete = courseState.progress >= 80;
    
    const canGetCertificate = exam1Completed && exam2Completed && exam1Passed && exam2Passed && progressComplete;
    
    if (canGetCertificate) {
        statusDiv.innerHTML = '<p class="success">¡Felicidades! Has completado todos los requisitos para obtener tu certificado.</p>';
        
        // Calcular puntuación promedio
        const avgScore = Math.round((courseState.exams['examen-1'].score + courseState.exams['examen-2'].score) / 2);
        
        // Mostrar datos en el certificado
        studentName.textContent = 'Estudiante Ejemplo'; // Esto vendría de la base de datos del usuario
        averageScore.textContent = avgScore;
        certificateDate.textContent = new Date().toLocaleDateString();
        
        // Habilitar descarga
        downloadButton.addEventListener('click', function() {
            // Simular descarga del certificado
            alert('Descargando certificado...');
            
            // Enviar solicitud de certificado al servidor
            sendCertificateRequest();
        });
    } else {
        // Mostrar requisitos pendientes
        let requirements = '<p>Para obtener tu certificado, necesitas:</p><ul>';
        
        if (!progressComplete) {
            requirements += '<li>Completar al menos el 80% del curso</li>';
        }
        
        if (!exam1Completed || !exam1Passed) {
            requirements += '<li>Aprobar el Examen 1</li>';
        }
        
        if (!exam2Completed || !exam2Passed) {
            requirements += '<li>Aprobar el Examen 2</li>';
        }
        
        requirements += '</ul>';
        
        statusDiv.innerHTML = requirements;
        certificateContainer.classList.add('hidden');
    }
}

// Evento para los módulos desplegables
document.querySelectorAll('.module-title').forEach(title => {
    title.addEventListener('click', function() {
        const section = this.getAttribute('data-section');
        
        // Si es un examen o certificado, cargar directamente
        if (section) {
            loadContent(section);
            return;
        }
        
        const content = this.nextElementSibling;
        const arrow = this.querySelector('span');
        
        // Toggle de clase active
        content.classList.toggle('active');
        
        // Cambiar flecha
        if (content.classList.contains('active')) {
            arrow.textContent = '▼';
        } else {
            arrow.textContent = '▶';
        }
    });
});

// Evento para los temas
document.querySelectorAll('.topic').forEach(topic => {
    topic.addEventListener('click', function() {
        const section = this.getAttribute('data-section');
        loadContent(section);
    });
});

// Función para enviar progreso al servidor
function sendProgressToServer() {
    console.log('Enviando progreso al servidor:', {
        section: courseState.currentSection,
        progress: courseState.progress,
        viewedSections: Array.from(courseState.viewedSections)
    });
    
    // Aquí iría el código para enviar los datos al servidor mediante fetch o XMLHttpRequest
    // Ejemplo con fetch:
    /*
    fetch('/api/progress', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            section: courseState.currentSection,
            progress: courseState.progress,
            viewedSections: Array.from(courseState.viewedSections)
        })
    })
    .then(response => response.json())
    .then(data => console.log('Progreso guardado:', data))
    .catch(error => console.error('Error al guardar progreso:', error));
    */
}

// Función para enviar resultados de examen al servidor
function sendExamResults(examId, score) {
    console.log('Enviando resultados de examen al servidor:', {
        examId,
        score,
        attempts: courseState.exams[examId].attempts
    });
    
    // Aquí iría el código para enviar los datos al servidor mediante fetch o XMLHttpRequest
}

// Función para enviar solicitud de certificado al servidor
function sendCertificateRequest() {
    console.log('Enviando solicitud de certificado al servidor');
    courseState.certificateRequested = true;
    
    // Aquí iría el código para enviar los datos al servidor mediante fetch o XMLHttpRequest
}

// Función para calcular el progreso basado en el scroll
function calculateScrollProgress() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Si el contenido es más corto que la ventana, considerar como 100% visto
    if (documentHeight <= windowHeight) {
        return 100;
    }
    
    // Calcular el porcentaje de scroll
    const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;
    return Math.min(100, Math.max(0, scrollPercent));
}

// Evento para seguimiento de scroll
window.addEventListener('scroll', function() {
    const scrollPercent = calculateScrollProgress();
    
    // Si se ha visto más del 80% del contenido, marcar como completado
    if (scrollPercent > 80) {
        // Ya lo tenemos marcado como visto al cargarlo, esto sería redundante
        // pero podríamos actualizar más información aquí si fuera necesario
    }
});

// Función para cargar contenido desde la base de datos
function loadCourseContent(courseId) {
    console.log('Cargando contenido del curso:', courseId);
    
    // Aquí iría el código para cargar el contenido del curso desde el servidor
    // En una implementación real, haría una petición AJAX para obtener los datos
    
    // Por ahora, usamos el contenido de ejemplo que ya tenemos
    return {
        title: 'Fundamentos de Python',
        modules: [
            {
                title: 'Introducción',
                sections: [
                    { id: 'que-es-python', title: '¿Qué es Python?' },
                    { id: 'tipos-de-datos', title: 'Tipos de datos' },
                    { id: 'instalacion', title: 'Instalación' }
                ]
            },
            // ... más módulos
        ]
    };
}

// Iniciar cargando la primera sección
loadContent('que-es-python');