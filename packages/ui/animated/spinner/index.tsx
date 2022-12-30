interface SpinnerProps {
  text?: string
  size?: number
  color?: string
  [key: string]: unknown
}

export const Spinner = ({ text, size = 1, color = '#4f46e5', ...rest }: SpinnerProps) => {
  const container_size = 140 * size
  const outer_size = 86 * size
  const mid_size = 60 * size
  const inner_size = 34 * size
  const text_size = 8 * size + 9

  const front_color = color

  return (
    <>
      <div id="wifi-loader" {...rest}>
        <svg className="circle-outer" viewBox="0 0 86 86">
          <circle className="back" cx="43" cy="43" r="40"></circle>
          <circle className="front" cx="43" cy="43" r="40"></circle>
          <circle className="new" cx="43" cy="43" r="40"></circle>
        </svg>
        <svg className="circle-middle" viewBox="0 0 60 60">
          <circle className="back" cx="30" cy="30" r="27"></circle>
          <circle className="front" cx="30" cy="30" r="27"></circle>
        </svg>
        <svg className="circle-inner" viewBox="0 0 34 34">
          <circle className="back" cx="17" cy="17" r="14"></circle>
          <circle className="front" cx="17" cy="17" r="14"></circle>
        </svg>
        <div className="text" data-text={text || 'loading'}></div>
      </div>
      {/* // TODO: import color from tailwindcss theme, and maybe transform this component to use tailwindcss instead of css */}
      <style>{`
        /* From uiverse.io by @mobinkakei */
        #wifi-loader {
          --background: #62abff;
          --back-color: #c3c8de;
          --front-color: #0080ff;
          --text-color: #414856;
          width: ${container_size}px;
          height: ${container_size}px;
          border-radius: 50px;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          margin: 1.6rem auto;
        }

        #wifi-loader svg {
          position: absolute;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        #wifi-loader svg circle {
          position: absolute;
          fill: none;
          stroke-width: 6px;
          stroke-linecap: round;
          stroke-linejoin: round;
          transform: rotate(-100deg);
          transform-origin: center;
        }

        #wifi-loader svg circle.back {
          stroke: var(--back-color);
        }

        #wifi-loader svg circle.front {
          stroke: var(--front-color);
        }

        #wifi-loader svg.circle-outer {
          height: ${outer_size}px;
          width: ${outer_size}px;
        }

        #wifi-loader svg.circle-outer circle {
          stroke-dasharray: 62.75 188.25;
        }

        #wifi-loader svg.circle-outer circle.back {
          animation: circle-outer135 1.8s ease infinite 0.3s;
          stroke-dashoffset: 25;
        }

        #wifi-loader svg.circle-outer circle.front {
          animation: circle-outer135 1.8s ease infinite 0.15s;
          stroke-dashoffset: 25;
        }

        #wifi-loader svg.circle-middle {
          height: ${mid_size}px;
          width: ${mid_size}px;
        }

        #wifi-loader svg.circle-middle circle {
          stroke-dasharray: 42.5 127.5;
        }

        #wifi-loader svg.circle-middle circle.back {
          animation: circle-middle6123 1.8s ease infinite 0.25s;
          stroke-dashoffset: 17;
        }

        #wifi-loader svg.circle-middle circle.front {
          animation: circle-middle6123 1.8s ease infinite 0.1s;
          stroke-dashoffset: 17;
        }

        #wifi-loader svg.circle-inner {
          height: ${inner_size}px;
          width: ${inner_size}px;
        }

        #wifi-loader svg.circle-inner circle {
          stroke-dasharray: 22 66;
        }

        #wifi-loader svg.circle-inner circle.back {
          animation: circle-inner162 1.8s ease infinite 0.2s;
          stroke-dashoffset: 9;
        }

        #wifi-loader svg.circle-inner circle.front {
          animation: circle-inner162 1.8s ease infinite 0.05s;
          stroke-dashoffset: 9;
        }

        #wifi-loader .text {
          position: absolute;
          top: ${container_size - text_size / 2}px;
          display: flex;
          justify-content: center;
          align-items: center;
          text-transform: lowercase;
          font-weight: 500;
          font-size: ${text_size}px;
          letter-spacing: 0.2px;
          text-align: center;
        }

        #wifi-loader .text::before,
        #wifi-loader .text::after {
          content: attr(data-text);
        }

        #wifi-loader .text::before {
          color: var(--text-color);
        }

        #wifi-loader .text::after {
          color: var(--front-color);
          animation: text-animation76 3.6s ease infinite;
          position: absolute;
          left: 0;
        }

        @keyframes circle-outer135 {
          0% {
            stroke-dashoffset: 25;
          }

          25% {
            stroke-dashoffset: 0;
          }

          65% {
            stroke-dashoffset: 301;
          }

          80% {
            stroke-dashoffset: 276;
          }

          100% {
            stroke-dashoffset: 276;
          }
        }

        @keyframes circle-middle6123 {
          0% {
            stroke-dashoffset: 17;
          }

          25% {
            stroke-dashoffset: 0;
          }

          65% {
            stroke-dashoffset: 204;
          }

          80% {
            stroke-dashoffset: 187;
          }

          100% {
            stroke-dashoffset: 187;
          }
        }

        @keyframes circle-inner162 {
          0% {
            stroke-dashoffset: 9;
          }

          25% {
            stroke-dashoffset: 0;
          }

          65% {
            stroke-dashoffset: 106;
          }

          80% {
            stroke-dashoffset: 97;
          }

          100% {
            stroke-dashoffset: 97;
          }
        }

        @keyframes text-animation76 {
          0% {
            clip-path: inset(0 100% 0 0);
          }

          50% {
            clip-path: inset(0);
          }

          100% {
            clip-path: inset(0 0 0 100%);
          }
        }
      `}</style>
    </>
  )
}
