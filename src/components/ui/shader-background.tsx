'use client'

import { useEffect, useRef } from 'react'

const vsSource = `
  attribute vec4 aVertexPosition;
  void main() {
    gl_Position = aVertexPosition;
  }
`

const fsSource = `
  precision highp float;
  uniform vec2 iResolution;
  uniform float iTime;

  const float overallSpeed = 0.2;
  const float gridSmoothWidth = 0.015;
  const float scale = 5.0;
  const vec4 lineColor = vec4(0.18, 0.85, 0.74, 1.0);
  const float minLineWidth = 0.006;
  const float maxLineWidth = 0.18;
  const float lineSpeed = 0.9 * overallSpeed;
  const float lineAmplitude = 1.3;
  const float lineFrequency = 0.22;
  const float warpSpeed = 0.18 * overallSpeed;
  const float warpFrequency = 0.5;
  const float warpAmplitude = 0.9;
  const float offsetFrequency = 0.5;
  const float offsetSpeed = 1.33 * overallSpeed;
  const float minOffsetSpread = 0.5;
  const float maxOffsetSpread = 2.2;
  const int linesPerGroup = 36;

  #define drawCircle(pos, radius, coord) smoothstep(radius + gridSmoothWidth, radius, length(coord - (pos)))
  #define drawSmoothLine(pos, hw, t) smoothstep(hw, 0.0, abs(pos - (t)))
  #define drawCrispLine(pos, hw, t) smoothstep(hw + gridSmoothWidth, hw, abs(pos - (t)))

  float random(float t) {
    return (cos(t) + cos(t * 1.3 + 1.3) + cos(t * 1.4 + 1.4)) / 3.0;
  }

  float getPlasmaY(float x, float hFade, float offset) {
    return random(x * lineFrequency + iTime * lineSpeed) * hFade * lineAmplitude + offset;
  }

  // Rotating radar sweep - defence/aerospace theme
  float radarSweep(vec2 pos) {
    float d = length(pos);
    if (d < 0.2 || d > 5.5) return 0.0;
    float angle = atan(pos.y, pos.x);
    float sweep = mod(iTime * 1.1, 6.2832);
    float diff = mod(angle - sweep + 6.2832, 6.2832);
    float trail = smoothstep(1.8, 0.0, diff) * 0.5;
    float beam  = smoothstep(0.05, 0.0, diff) * 1.0;
    return (trail + beam) * smoothstep(5.5, 0.5, d) * smoothstep(0.2, 0.8, d);
  }

  // Concentric radar rings
  float radarRings(vec2 pos) {
    float d = length(pos);
    float r = 0.0;
    r += smoothstep(0.03, 0.0, abs(mod(d, 1.5) - 0.75)) * 0.6;
    r += smoothstep(0.015, 0.0, abs(mod(d, 0.75) - 0.375)) * 0.25;
    return r * smoothstep(5.5, 0.3, d) * smoothstep(0.15, 0.5, d);
  }

  // BOM network nodes - pulsing dots with connecting traces
  float bomNodes(vec2 pos) {
    float cellSize = 1.1;
    vec2 cell = floor(pos / cellSize);
    vec2 local = fract(pos / cellSize) - 0.5;
    float nr = random(cell.x * 4.3 + cell.y * 17.7) * 0.5 + 0.5;
    float pulse = sin(iTime * 2.2 * nr + cell.x * 1.7 + cell.y * 2.3) * 0.5 + 0.5;
    float node = smoothstep(0.09, 0.03, length(local)) * pulse * nr;
    // horizontal and vertical PCB-style traces
    float hTrace = smoothstep(0.022, 0.008, abs(local.y)) * smoothstep(0.5, 0.2, abs(local.x)) * nr * 0.35;
    float vTrace = smoothstep(0.022, 0.008, abs(local.x)) * smoothstep(0.5, 0.2, abs(local.y)) * nr * 0.35;
    return node + hTrace + vTrace;
  }

  // 99.4% accuracy fill bar - a thin horizontal bar that fills to 99.4%
  float accuracyBar(vec2 uv) {
    float barY = smoothstep(0.012, 0.0, abs(uv.y - 0.88));
    float fill  = step(uv.x, 0.994);
    float edge  = smoothstep(0.003, 0.0, abs(uv.x - 0.994)) * 3.0;
    float pulse = sin(iTime * 4.0) * 0.4 + 0.6;
    return barY * (fill * 0.6 + edge) * pulse;
  }

  // Crosshair targeting reticle at centre
  float reticle(vec2 pos) {
    float d = length(pos);
    float ring1 = smoothstep(0.03, 0.0, abs(d - 0.5));
    float ring2 = smoothstep(0.015, 0.0, abs(d - 1.0)) * 0.4;
    float cross = max(
      smoothstep(0.015, 0.0, abs(pos.x)) * smoothstep(0.6, 0.52, abs(pos.y)),
      smoothstep(0.015, 0.0, abs(pos.y)) * smoothstep(0.6, 0.52, abs(pos.x))
    ) * 0.5;
    float pulse = sin(iTime * 3.0) * 0.35 + 0.65;
    return (ring1 + ring2 + cross) * pulse * smoothstep(1.5, 0.1, d);
  }

  void main() {
    vec2 fragCoord = gl_FragCoord.xy;
    vec2 uv = fragCoord / iResolution.xy;
    vec2 rawSpace = (fragCoord - iResolution.xy * 0.5) / iResolution.x * 2.0 * scale;
    vec2 space = rawSpace;

    float hFade = 1.0 - (cos(uv.x * 6.2832) * 0.5 + 0.5);
    float vFade = 1.0 - (cos(uv.y * 6.2832) * 0.5 + 0.5);

    space.y += random(space.x * warpFrequency + iTime * warpSpeed) * warpAmplitude * (0.5 + hFade);
    space.x += random(space.y * warpFrequency + iTime * warpSpeed + 2.0) * warpAmplitude * hFade;

    // Plasma lines
    vec4 lines = vec4(0.0);
    for (int l = 0; l < linesPerGroup; l++) {
      float ni = float(l) / float(linesPerGroup);
      float ot = iTime * offsetSpeed;
      float op = float(l) + space.x * offsetFrequency;
      float rand = random(op + ot) * 0.5 + 0.5;
      float hw = mix(minLineWidth, maxLineWidth, rand * hFade) / 2.0;
      float offset = random(op + ot * (1.0 + ni)) * mix(minOffsetSpread, maxOffsetSpread, hFade);
      float lp = getPlasmaY(space.x, hFade, offset);
      float line = drawSmoothLine(lp, hw, space.y) / 2.0 + drawCrispLine(lp, hw * 0.15, space.y);
      float cx = mod(float(l) + iTime * lineSpeed, 25.0) - 12.0;
      vec2 cp = vec2(cx, getPlasmaY(cx, hFade, offset));
      line += drawCircle(cp, 0.012, space) * 5.0;
      lines += line * lineColor * rand;
    }

    // Defence / aerospace overlays
    vec4 teal = vec4(0.18, 0.85, 0.74, 1.0);
    vec4 result = lines;
    result += teal * radarSweep(rawSpace) * 0.7;
    result += teal * radarRings(rawSpace) * 0.3;
    result += teal * bomNodes(rawSpace)   * 0.55;
    result += teal * reticle(rawSpace)    * 0.6;
    result += teal * accuracyBar(uv)      * 0.8;

    float brightness = clamp(dot(result.rgb, vec3(0.299, 0.587, 0.114)), 0.0, 1.0);
    gl_FragColor = vec4(result.rgb, brightness * vFade);
  }
`

function loadShader(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type)
  if (!shader) return null
  gl.shaderSource(shader, source)
  gl.compileShader(shader)
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader)
    return null
  }
  return shader
}

function initShaderProgram(gl: WebGLRenderingContext): WebGLProgram | null {
  const vs = loadShader(gl, gl.VERTEX_SHADER, vsSource)
  const fs = loadShader(gl, gl.FRAGMENT_SHADER, fsSource)
  if (!vs || !fs) return null
  const program = gl.createProgram()
  if (!program) return null
  gl.attachShader(program, vs)
  gl.attachShader(program, fs)
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null
  return program
}

interface ShaderBackgroundProps {
  className?: string
}

export default function ShaderBackground({ className = '' }: ShaderBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const gl = canvas.getContext('webgl', { alpha: true, premultipliedAlpha: false })
    if (!gl) return
    gl.enable(gl.BLEND)
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA)

    const program = initShaderProgram(gl)
    if (!program) return

    const positionBuffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW)

    const vertexPosition = gl.getAttribLocation(program, 'aVertexPosition')
    const uResolution = gl.getUniformLocation(program, 'iResolution')
    const uTime = gl.getUniformLocation(program, 'iTime')

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio
      canvas.height = canvas.offsetHeight * window.devicePixelRatio
      gl.viewport(0, 0, canvas.width, canvas.height)
    }
    window.addEventListener('resize', resize)
    resize()

    let raf: number
    const startTime = Date.now()

    const render = () => {
      const t = (Date.now() - startTime) / 1000
      gl.clearColor(0, 0, 0, 0)
      gl.clear(gl.COLOR_BUFFER_BIT)
      gl.useProgram(program)
      gl.uniform2f(uResolution, canvas.width, canvas.height)
      gl.uniform1f(uTime, t)
      gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
      gl.vertexAttribPointer(vertexPosition, 2, gl.FLOAT, false, 0, 0)
      gl.enableVertexAttribArray(vertexPosition)
      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
      raf = requestAnimationFrame(render)
    }

    raf = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full ${className}`}
    />
  )
}
