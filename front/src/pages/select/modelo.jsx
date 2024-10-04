import { useEffect, useRef, Suspense } from "react";
import { Canvas, useThree } from "@react-three/fiber";
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
                        child.castShadow = false; // Desactiva la proyección de sombras
                        child.receiveShadow = false; // Desactiva la recepción de sombras
                        child.material.needsUpdate = true;
                    }
                });

                fbx.scale.set(0.1, 0.1, 0.1);
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
                position: [20, 15, 30], // Posición inicial de la cámara
                fov: 50, // Campo de visión
                near: 0.1, // Plano cercano
                far: 1000, // Plano lejano
            }}
            shadows={false} // Desactiva las sombras en el canvas
            gl={{
                alpha: true, // Habilita la transparencia en el contexto WebGL
                antialias: true, // Mejora la calidad del renderizado
                preserveDrawingBuffer: true, // Mantiene el buffer de dibujo
                premultipliedAlpha: false, // Desactiva la mezcla pre-multiplicada para la transparencia
            }}
            onCreated={({ gl, camera }) => {
                gl.setClearColor(0x000000, 0); // Fondo transparente del renderer
                camera.lookAt(0, 0, 0); // Apunta la cámara al centro de la escena
            }}
        >
            {/* Luces de la escena */}
            <ambientLight intensity={1} color="#ffffff" />
            <directionalLight position={[10, 10, 5]} intensity={0.5} castShadow={false} /> {/* Luz direccional */}
            <pointLight position={[0, 5, 0]} intensity={1} castShadow={false} /> {/* Luz puntual */}
            
            <Suspense fallback={null}>
                <Model auto={auto} />
            </Suspense>

            {/* Control de la cámara */}
            <OrbitControls
                enableZoom={true} // Habilita el zoom con la rueda del ratón
                target={[0, 1, 0]} // Punto de enfoque de la cámara
            />
        </Canvas>
    );
}

export default Modelo;
