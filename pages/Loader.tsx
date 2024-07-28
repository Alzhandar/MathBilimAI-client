// import React, { useEffect } from 'react';

// const Loader = () => {
//     useEffect(() => {
//         const pathIds = ['divide', 'dots', 'multiply', 'equals'];
//         const myIcons = new SVGMorpheus('#loaderSvg');
//         let currentIndex = 0;
//         const svgOptions = {
//             duration: 300,
//             rotation: 'none',
//             easing: 'quint-in-out'
//         };

//         const interval = setInterval(() => {
//             myIcons.to(pathIds[currentIndex], svgOptions, () => {
//                 if (currentIndex === (pathIds.length - 1)) {
//                     currentIndex = 0;
//                 } else {
//                     currentIndex++;
//                 }
//             });
//         }, 700);

//         return () => clearInterval(interval);
//     }, []);

//     return (
//         <div className="flex justify-center items-center">
//             <div className="loader">
//                 <svg className="w-24" id="loaderSvg" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 230.1 240.8" xml:space="preserve">
//                     <style>
//                         {`path { fill: #2663EB; }`}
//                     </style>
//                     <g id="divide">
//                         <path className="st0" d="M0,87.9h230V153H0V87.9z M138.1,55.7c-12.7,12.7-33.4,12.7-46.1,0S79.3,22.3,92,9.5s33.4-12.7,46.1,0
//                         S150.8,42.9,138.1,55.7z M138.1,231.3c-12.7,12.7-33.4,12.7-46.1,0s-12.7-33.4,0-46.1c12.7-12.7,33.4-12.7,46.1,0
//                         S150.8,218.5,138.1,231.3z"/>
//                     </g>
//                     <g id="multiply">
//                         <path className="st0" d="M173.7,224.7L10.8,61.8l45.6-45.6l162.9,162.9L173.7,224.7z"/>
//                         <path className="st0" d="M10.8,179L173.7,16.1l45.6,45.6L56.3,224.5L10.8,179z"/>
//                     </g>
//                     <g id="dots">
//                         <path d="M66.1,97.4c12.7,12.7,12.7,33.4,0,46.1s-33.4,12.7-46.1,0s-12.7-33.4,0-46.1S53.4,84.6,66.1,97.4z M210.1,97.4
//                             c12.7,12.7,12.7,33.4,0,46.1s-33.4,12.7-46.1,0c-12.7-12.7-12.7-33.4,0-46.1S197.3,84.6,210.1,97.4z" />
//                     </g>
//                     <g id="equals">
//                         <path className="st0" d="M0.1,138.6h230v65.1H0.1V138.6z M0,0l230,0v65.1H0L0,0z" />
//                     </g>
//                 </svg>
//             </div>
//         </div>
//     );
// };

// export default Loader;
