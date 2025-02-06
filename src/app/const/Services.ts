import { type ServiceProps } from "@/app/types/Services";
export const services: ServiceProps[] = [
    {
        id: 1,
        title: "Quiropodia",
        description: "Cuida la salud de tus pies con quiropodista certificada.",
        img: "/img/quiropodia.png",
        price: "₡ 25.000",
        info: [
            {

                title: "Pie clínico",
                description: "Evaluación completa del estado del pie, identificando posibles alteraciones o problemas en su salud"
            },
            {

                title: "Corte y fresado de uñas terapéutico",
                description: "Pulido para dar forma a las uñas, ayuda a prevenir el crecimiento de bacterias y hongos, mejorando la salud de las uñas"
            },
            {

                title: "Deslaminación de callosidades",
                description: "Eliminación de capas gruesas de piel para aliviar molestias, mejorar la estética del pie y prevenir complicaciones futuras"
            },
            {

                title: "Cura de pequeñas heridas",
                description: "Tratamiento que previene infecciones y promueve una adecuada cicatrización para evitar complicaciones mayores"
            },
            {

                title: "Tratamiento para hiperqueratosis y helomas",
                description: "Reducción de callosidades y helomas para mejorar la comodidad y la salud del pie"
            },
            {

                title: "Fresado de los talones",
                description: "Procedimiento utilizado para eliminar durezas y callosidades en la zona del talón, se emplea un dispositivo con fresas o limas específicas para eliminar las capas de piel dura"
            },
            {

                title: "Hidratación y masaje relajante",
                description: "Tratamiento completo que incluye hidratación profunda y masajes para aliviar tensiones y mejorar la salud de los pies"
            },
            {

                title: "Tratamiento preventivo para pie diabético",
                description: "Cuidados especiales para prevenir complicaciones en los pies de personas con diabetes"
            },
            {
                extra: "₡ 5.000",
                title: "Tratamiento preventivo de onicocriptosis",
                description: "Cuidado especializado para prevenir y tratar uñas encarnadas, evitando infecciones y mejorando el confort"
            },
            {
                extra: "₡ 5.000",
                title: "Tratamiento preventivo de onicomicosis",
                description: "Fresado de uñas y tratamiento especializado para evitar la formación de hongos"
            },
            {
                extra: "₡ 5.000",
                title: "Tratamiento preventivo de onicogrifosis",
                description: "Fresado de uñas para prevenir el engrosamiento excesivo y deformación"
            },
            {
                extra: "₡ 10.000",
                title: "Reflexología podal",
                description: "Terapia que aplica presión en puntos específicos de los pies, ayudando a mejorar el bienestar general del cuerpo"
            }

        ]
    },
    {
        id: 4,
        title: "Manicura",
        description: "Dale color a tus uñas con manicurista certificada.",
        img: "/img/manicura.jpg",
        info: [
            {
                title: "Soft Gel / Gel X",
                description: "Extensiones de gel suave que proporcionan un acabado natural y flexible, ideales para uñas fuertes y de aspecto delicado.",
                price: "₡ 13.000",
                img: "/img/manicura/gelx.jpg"
            },
            {
                title: "Builder Gel",
                description: "Gel constructor de alta densidad utilizado para esculpir y dar forma a uñas, proporcionando fuerza y durabilidad en aplicaciones extensas.",
                price: "₡ 10.000",
                img: "/img/manicura/builder.jpg"
            },
            {
                title: "Polygel",
                description: "Combinación de gel y acrílico que ofrece una aplicación ligera y flexible, ideal para esculpir uñas resistentes sin el peso del acrílico.",
                price: "₡ 13.000",
                img: "/img/manicura/polygel.jpg"
            },
            {
                title: "Acrílico",
                description: "Sistema clásico de uñas esculpidas que ofrece resistencia y durabilidad, perfecto para quienes buscan un acabado robusto y duradero.",
                price: "₡ 12.000",
                img: "/img/manicura/acrilico.jpg"
            },
            {
                title: "Híbridas",
                description: "Técnica que combina diferentes sistemas como gel y acrílico, ofreciendo lo mejor de ambos para una mayor flexibilidad y resistencia.",
                price: "₡ 15.000",
                img: "/img/manicura/hibridas.jpg"
            },
            {
                title: "Dual System",
                description: "Método rápido y eficiente para crear uñas esculpidas con moldes, combinando la fuerza del acrílico con la flexibilidad del gel.",
                price: "₡ 14.000",
                img: "/img/manicura/dual.jpg"
            },
            {
                title: "Rubber Base",
                description: "Base flexible y resistente que protege las uñas naturales, brindando mayor adherencia y durabilidad al esmaltado.",
                price: "₡ 12.000",
                img: "/img/manicura/rubber.jpg"
            },
            {
                title: "Esmaltado semipermanente",
                description: "Acabado brillante y duradero por semanas, ideal para mantener las uñas impecables sin deteriorarse.",
                price: "₡ 7.000",
                img: "/img/manicura/semipermanente.jpg"
            }
        ]
    },
    {
        id: 3,
        title: "Maquillaje",
        description: "Maquilla tu rostro con maquillista certificada.",
        img: "/img/makeup.jpg",
        info: [
            {
                id: 1,
                title: "Sociales",
                subinfo: [
                    {
                        title: "Social de día",
                        price: "₡ 15.000"
                    },
                    {
                        title: "Social de tarde",
                        price: "₡ 17.000"
                    },
                    {
                        title: "Social de noche",
                        price: "₡ 20.000"
                    }
                ]
            },
            {
                id: 2,
                title: "Eventos",
                subinfo: [
                    {
                        title: "Graduación de día",
                        price: "₡ 15.000"
                    },
                    {
                        title: "Graduación de noche",
                        price: "₡ 20.000"
                    },
                    {
                        title: "XV Años de día",
                        price: "₡ 15.000"
                    },
                    {
                        title: "XV Años de noche",
                        price: "₡ 20.000"
                    }
                ]
            },
            {
                id: 3,
                title: "Editorial",
            },
            {
                id: 4,
                title: "Bodas",
                description: "Solicita nuestros paquetes de boda por PDF"
            },
            {
                id: 5,
                title: "Graduaciones",
            },
            {
                id: 6,
                title: "XV años",
            },
            {
                id: 7,
                title: "Glam",
            }
        ]
    },
    {
        id: 4,
        title: "Peluqueria",
        description: "Haz un cambio de look con estilista certificada.",
        img: "/img/peluqueria.png",
        info: [
            {
                id: 0,
                title: "Corte de cabello",
                description: "Cortes personalizados que realzan tu estilo y se adaptan a tus necesidades, para un look fresco y moderno.",
                subinfo: [
                    {
                        title: "Corte Recto",
                        price: "₡ 10.000",
                        img: "/img/peluqueria/cortes/corte-recto.jpg"
                    },
                    {
                        title: "Corte en V",
                        price: "₡ 10.000",
                        img: "/img/peluqueria/cortes/corte-v.jpg"
                    },
                    {
                        title: "Corte en U",
                        price: "₡ 10.000",
                        img: "/img/peluqueria/cortes/corte-u.jpg"
                    },
                    {
                        title: "Corte Bob",
                        price: "₡ 10.000",
                        img: "/img/peluqueria/cortes/corte-bob.jpg"
                    },
                    {
                        title: "Corte en Capas cortas",
                        price: "₡ 10.000",
                        img: "/img/peluqueria/cortes/capas-cortas.jpg"
                    },
                    {
                        title: "Corte en Capas medias",
                        price: "₡ 10.000",
                        img: "/img/peluqueria/cortes/capas-medias.jpg"
                    },
                    {
                        title: "Corte en Capas largas",
                        price: "₡ 10.000",
                        img: "/img/peluqueria/cortes/capas-largas.jpg"
                    },
                    {
                        title: "Corte de puntas",
                        price: "₡ 8.000",
                        img: "/img/peluqueria/cortes/corte-puntas.jpg"
                    },
                    {
                        title: "Disminución",
                        price: "₡ 8.000",
                        img: "/img/peluqueria/cortes/disminucion.jpg"
                    },
                ]
            },
            {
                id: 1,
                title: "Tratamientos",
                description: "Soluciones especializadas para hidratar, reparar y revitalizar el cabello, devolviéndole su brillo y suavidad natural.",
                subinfo: [
                    {
                        title: "Hidratación",
                        price: "₡ 10.000"
                    },
                    {
                        title: "Hidratación Intensiva",
                        price: "₡ 15.000"
                    },
                    {
                        title: "Nutrición",
                        price: "₡ 10.000"
                    },
                    {
                        title: "Botox Alisante",
                        price: "₡ 20.000"
                    },
                    {
                        title: "Botox Hidratante",
                        price: "₡ 15.000"
                    },
                    {
                        title: "Cóctel Hidratante",
                        price: "₡ 15.000"
                    },
                ]

            },
            {
                id: 2,
                title: "Alisados orgánicos",
                description: "Técnicas de alisado que utilizan productos naturales para obtener un cabello suave y liso, sin dañar su estructura.",
                subinfo: [
                    {
                        title: "Liso orgánico",
                        description: "Nuestro Liso Orgánico ''Amino Liss Pro'' es la nueva disciplina capilar, con una formulación especial a base de aminoácidos esenciales, ácidos orgánicos, aceites y emolientes que ayudan a eliminar el frizz y el encrespamiento. Nuestro Liso tiene como objetivo hidratar a profundidad, recomponer la textura, mejorar su apariencia y aportar docilidad. Su durabilidad es de 5 a 6 meses y es ideal para cabellos procesados, con frizz o encrespamiento.",
                        img: "/img/peluqueria/lisos/organico.jpg",
                    },
                    {
                        title: "Nanokeratina",
                        description: "Nuestra ''Nanokeratina Orgánica Premium'' contiene la más avanzada nanotecnología de punta, sin ácidos dañinos ni alcalinos y su nueva fórmula con BIO-TECNOLOGÍA hará que tu cabello luzca hermoso y radiante. Es un producto orgánico, libre de formol e irritantes que no arde, no enchila y no produce comezón. Su durabilidad es de 5 a 6 meses. Es ideal para cabellos procesados ya que los restaura y les devuelve la vida de manera progresiva.",
                        img: "/img/peluqueria/lisos/nanokeratina.jpg",
                    },
                    {
                        title: "Liso japonés",
                        description: "Nuestro ''Liso Keratina Japonés'' contiene moléculas electronegativas que ayudan a cambiar la línea del cabello; además de humectar e hidratar, deja el cabello bastante suave, sedoso y brilloso. Es un producto libre de formol, apto para niñas con cabello libre de procesos químicos. Su durabilidad es de 3 a 5 meses y además de alisar el cabello, también elimina el frizz y reduce el volumen en cabellos abundantes.",
                        img: "/img/peluqueria/lisos/japones.jpg",
                    },

                ]
            },
            {
                id: 3,
                title: "Peinados",
                description: "Estilos elegantes y personalizados para cualquier ocasión, desde eventos formales hasta looks casuales y modernos.",
                subinfo: [
                    {
                        title: "Planchado",
                        price: "₡ 8.000"
                    },
                    {
                        title: "Ondas",
                        price: "₡ 10.000"
                    },
                    {
                        title: "Semi Recogidos",
                        price: "₡ 12.000"
                    },
                    {
                        title: "Trenzas",
                        price: "₡ 15.000"
                    },
                ]
            },
            {
                id: 4,
                title: "Blower y planchado",
                description: "Secado y alisado profesional para un acabado liso y brillante, ideal para un look pulido y duradero.",
                price: "₡ 7.000"
            }

        ]
    },
    {
        id: 5,
        title: "Pedicura",
        description: "Conciente tus pies con pedicurista certificada.",
        img: "/img/pedicura.jpg",
        info: [
            {
                title: "Pedicure spa",
                description: "Tratamiento relajante con exfoliación, hidratación y masaje, para dejar los pies suaves y revitalizados.",
                img: "/img/pedicura/pedicura-spa.jpg",
                price: "₡ 13.000"
            },
            {
                title: "Pedicure clínico",
                description: "Atención especializada para tratar callos y problemas de pies, enfocada en su salud.",
                img: "/img/pedicura/pedicura-clinica.jpg",
                price: "₡ 15.000"
            },
            {
                title: "Pedicure ruso",
                description: "Técnica para el cuidado preciso de las cutículas y uñas, logrando un acabado natural y duradero.",
                img: "/img/pedicura/pedicura-rusa.jpg",
                price: "₡ 6.000"
            },
            {
                title: "Esmaltado semipermanente",
                description: "Acabado brillante y duradero por semanas, ideal para mantener las uñas impecables y estéticas.",
                img: "/img/pedicura/esmaltado.jpg",
                price: "₡ 7.000"
            }

        ]
    }
]