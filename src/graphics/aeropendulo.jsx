
const Aeropendulo_svg = ({angle=0,angle_ghost=0}) => (
    <svg
        // Quito el ancho y el alto para hacerlo reactivo 
    // width={365}
   // height="grow"
    viewBox="0 0 400 400"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    
  >
    <g id="Barra_motores_ghost" transform={` translate(0 180) rotate(${angle_ghost} 182.5 16)`}>
      opacity={0.3}
      <g id="Rectangle 1 ghost">
        <rect x={0.5} y={9.5} width={364} height={14} rx={7} fill="#C059FD" fillOpacity={0.3}/>
        <rect x={0.5} y={9.5} width={364} height={14} rx={7} stroke="#C059FD" strokeOpacity={0.5} />
        <rect
          x={0.5}
          y={9.5}
          width={364}
          height={14}
          rx={7}
          stroke="#C059FD"
          strokeOpacity={0.2}
        />
      </g>
      <rect id="Rectangle 2 ghost" x={7} width={41} height={9} fill="#D9D9D9" fillOpacity={0.3} />
      <rect id="Rectangle 3 ghost" x={318} width={41} height={9} fill="#D9D9D9" fillOpacity={0.3}/>
    </g>
    <g id="Barra_motores" transform={` translate(0 180) rotate(${angle} 182.5 16)`}>
      <g id="Rectangle 1">
        <rect x={0.5} y={9.5} width={364} height={14} rx={7} fill="#C059FD" />
        <rect x={0.5} y={9.5} width={364} height={14} rx={7} stroke="#C059FD" />
        <rect
          x={0.5}
          y={9.5}
          width={364}
          height={14}
          rx={7}
          stroke="#C059FD"
          strokeOpacity={0.2}
        />
      </g>
      <rect id="Rectangle 2" x={7} width={41} height={9} fill="#D9D9D9" />
      <rect id="Rectangle 3" x={318} width={41} height={9} fill="#D9D9D9" />
    </g>
    <path
            id="Ellipse 1"
            transform={` translate(0 180)`}
      d="M182.5 4.5C189.147 4.5 194.5 9.66777 194.5 16C194.5 22.3322 189.147 27.5 182.5 27.5C175.853 27.5 170.5 22.3322 170.5 16C170.5 9.66777 175.853 4.5 182.5 4.5Z"
      fill="#76CAFF"
      stroke="black"
    />
  </svg>
)
export default Aeropendulo_svg
