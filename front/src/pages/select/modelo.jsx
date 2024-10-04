import { useEffect, useRef, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { FBXLoader } from "three-stdlib";
import * as THREE from "three";
import { OrbitControls } from "@react-three/drei";

// Componente que carga el modelo FBX
function Model({ auto }) {
    const fbxRef = useRef(new THREE.Group());

    useEffect(() => {
        const loader = new FBXLoader();
        const ruta = `/src/assets/models/${auto}.fbx`;

        loader.load(
            ruta, // Ruta del archivo FBX
            (fbx) => {
                fbx.traverse((child) => {
                    if (child.isMesh) {
                        const material = child.material;

                        // Mostrar el nombre de cada material en la consola

                        if (typeof (material.name) === 'string') {
                            // Aplicar propiedades según nombre del material
                            if (material.name.includes("Glass") || material.name.includes("Window")) {
                                material.transparent = true; // Solo habilitar transparencia en materiales de cristal
                                material.opacity = 0.5; // Opacidad para vidrio
                                material.roughness = 0; // Superficie lisa para cristales
                                material.metalness = 0; // Sin metalidad en vidrios
                            } else if (material.name.includes("Negro")) {
                                material.metalness = 1; // Efecto metálico (0 a 1)
                                material.roughness = 0; // Baja rugosidad para metales
                                material.opacity = 1; // No aplicar transparencia a metales
                                material.transparent = false;
                            } else if (material.name === "Luces") {
                                console.log("Luces")
                                material.emissive = new THREE.Color(0xffffff); // Color blanco como luz
                                material.emissiveIntensity = 1; // Intensidad del color emisivo
                                material.roughness = 0; // Suavidad máxima
                                material.metalness = 0; // Sin metalidad
                                material.opacity = 1; // Sin transparencia
                                material.transparent = false;
                            } else if (material.name === "Luz") {
                                console.log("Luces")
                                material.emissive = new THREE.Color(0xffffff); // Color blanco como luz
                                material.emissiveIntensity = 5; // Intensidad del color emisivo
                                material.roughness = 0; // Suavidad máxima
                                material.metalness = 0; // Sin metalidad
                                material.opacity = 1; // Sin transparencia
                                material.transparent = false;
                            } else {
                                // Materiales generales (carrocería, etc.)
                                material.metalness = 0.2; // Efecto metálico reducido
                                material.roughness = 0.5; // Rugosidad intermedia
                                material.opacity = 1; // Sin transparencia
                                material.transparent = false;
                            }

                            material.needsUpdate = true; // Actualizar material tras cambios
                        }

                        child.castShadow = true; // Activar proyección de sombras
                        child.receiveShadow = true; // Activar recepción de sombras
                    }
                });

                fbx.scale.set(0.1, 0.1, 0.1); // Escalar el modelo
                fbxRef.current.add(fbx);
            },
            undefined,
            (error) => console.error("Error al cargar el modelo:", error)
        );
    }, [auto]);

    return <group ref={fbxRef} />;
}

// Componente principal que renderiza el Canvas con la cámara predeterminada
function Modelo({ auto }) {
    return (
        <Canvas
            style={{ background: "transparent" }} // Fondo del canvas transparente
            camera={{
                position: [0, 35, 50], // Posición inicial de la cámara
                fov: 30, // Campo de visión
                near: 0.1, // Plano cercano
                far: 15000, // Plano lejano
            }}
            shadows={true} // Activar sombras en el canvas
            gl={{
                alpha: true, // Habilita la transparencia en el contexto WebGL
                antialias: true, // Mejora la calidad del renderizado
                preserveDrawingBuffer: true, // Mantiene el buffer de dibujo
                premultipliedAlpha: false, // Desactiva la mezcla pre-multiplicada para la transparencia
                physicallyCorrectLights: true, // Luces físicas para materiales PBR
                toneMapping: THREE.ACESFilmicToneMapping, // Tone Mapping para una mejor representación
                outputEncoding: THREE.sRGBEncoding, // Codificación de salida
            }}
            onCreated={({ gl, camera }) => {
                gl.setClearColor(0x000000, 0); // Fondo transparente del renderer
                camera.lookAt(0, 0, 0); // Apunta la cámara al centro de la escena
            }}
        >
            <ambientLight intensity={0.4} color="#ffffff" />

            <directionalLight
                castShadow
                position={[5, 10, 5]}
                intensity={1}
                shadow-mapSize-width={4096}  // Ancho de la resolución de la sombra
                shadow-mapSize-height={4096} // Alto de la resolución de la sombra
                shadow-camera-far={50}       // Ajuste de la cámara para la sombra
                shadow-camera-near={1}
            />
            <pointLight position={[0, 5, 0]} intensity={0.8} castShadow={true} />

            <Suspense fallback={null}>
                <Model auto={auto} />
            </Suspense>

            {/* Control de la cámara */}
            <OrbitControls
                enableZoom={true} // Habilita el zoom con la rueda del ratón
                maxPolarAngle={Math.PI / 2} // Restringir ángulo vertical
                minPolarAngle={0} // Restringir ángulo inferior
                maxDistance={150} // Distancia máxima de la cámara
                minDistance={10} // Distancia mínima de la cámara
                target={[0, 1, 0]} // Punto de enfoque de la cámara
            />
        </Canvas>
    );
}

export default Modelo;
