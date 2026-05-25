'use client'
import { useEffect, useRef } from 'react'

const FRAG = `
precision highp float;
uniform vec2  uRes;
uniform float uTime;

float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}
float fbm(vec2 p){
  float v = 0.0, a = 0.5;
  for(int i = 0; i < 5; i++){ v += a * noise(p); p *= 2.0; a *= 0.5; }
  return v;
}

void main(){
  vec2 uv = (gl_FragCoord.xy - 0.5 * uRes) / uRes.y;
  float t = uTime * 0.08;
  float c = cos(t), s = sin(t);
  vec2 p = mat2(c, -s, s, c) * uv;

  vec2 q = vec2(fbm(p + uTime * 0.05), fbm(p + vec2(3.2, 1.7) + uTime * 0.04));
  float n = fbm(p * 1.6 + q * 2.5 + uTime * 0.03);

  float band = smoothstep(0.55, 0.0, abs(p.y + sin(p.x * 1.4 + uTime * 0.2) * 0.35 + (n - 0.5) * 0.9));

  vec3 cBlue   = vec3(0.60, 0.95, 0.95);
  vec3 cPurple = vec3(0.40, 0.90, 0.90);
  vec3 cPink   = vec3(0.55, 0.92, 0.88);
  vec3 cOrange = vec3(0.30, 0.88, 0.88);

  float g = clamp(n + p.x * 0.4 + 0.5, 0.0, 1.0);
  vec3 col = mix(cBlue, cPurple, smoothstep(0.0, 0.4, g));
  col = mix(col, cPink,   smoothstep(0.35, 0.7,  g));
  col = mix(col, cOrange, smoothstep(0.65, 1.0,  g));

  float glow = band * (0.6 + 0.7 * fbm(p * 3.0 - uTime * 0.1));
  vec3 outCol = col * glow * 1.6;
  outCol += col * pow(band, 3.0) * 0.6;

  vec3 bg    = vec3(1.0);
  vec3 final = bg - (1.0 - outCol);
  final = mix(bg, final, clamp(glow * 1.2, 0.0, 1.0));

  gl_FragColor = vec4(final, 1.0);
}
`

const VERT = `
attribute vec2 aPos;
void main(){ gl_Position = vec4(aPos, 0.0, 1.0); }
`

export function GradientRibbon({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const gl = canvas.getContext('webgl', { antialias: true })
    if (!gl) return

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type)!
      gl.shaderSource(sh, src)
      gl.compileShader(sh)
      return sh
    }
    const prog = gl.createProgram()!
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT))
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG))
    gl.linkProgram(prog)
    gl.useProgram(prog)

    const buf = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buf)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 1,-1, -1,1, 1,1]), gl.STATIC_DRAW)
    const aPos = gl.getAttribLocation(prog, 'aPos')
    gl.enableVertexAttribArray(aPos)
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

    const uRes  = gl.getUniformLocation(prog, 'uRes')
    const uTime = gl.getUniformLocation(prog, 'uTime')

    let raf = 0
    const start = performance.now()

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width  = canvas.clientWidth  * dpr
      canvas.height = canvas.clientHeight * dpr
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    resize()
    window.addEventListener('resize', resize)

    const loop = () => {
      gl.uniform2f(uRes,  canvas.width, canvas.height)
      gl.uniform1f(uTime, (performance.now() - start) / 1000)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      raf = requestAnimationFrame(loop)
    }
    loop()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className={className} />
}
