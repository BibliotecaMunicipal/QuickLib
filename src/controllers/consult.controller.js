import { Consults } from "../models/models.js";

export const registerConsult = async (req, res) => {
    console.log(req.body);
    const {name, lastName, gender, age, education, occupation, title, author} = req.body;
    try {
        const newConsult = new Consults({
            name,
            lastName,
            gender, 
            age,
            education,
            occupation,
            title,
            author,
        });
        const saveConsult = await newConsult.save();
        res.send(saveConsult);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


export const getStatistics = async (req, res) => {
    try {
        const stats = await Consults.aggregate([
            {
                $facet: {
                    totalMen: [
                        { $match: { gender: 'Hombre' } },
                        { $count: 'count' }
                    ],
                    totalWomen: [
                        { $match: { gender: 'Mujer' } },
                        { $count: 'count' }
                    ],
                    menOverSixty: [
                        { $match: { gender: 'Hombre', age: { $gt: 60 } } },
                        { $count: 'count' }
                    ],
                    womenOverSixty: [
                        { $match: { gender: 'Mujer', age: { $gt: 60 } } },
                        { $count: 'count' }
                    ],
                    menBetween30AndT59: [
                        { $match: { gender: 'Hombre', age: { $gte: 30, $lte: 59 } } },
                        { $count: 'count' }
                    ],
                    womenBetween30And59: [
                        { $match: { gender: 'Mujer', age: { $gte: 30, $lte: 59 } } },
                        { $count: 'count' }
                    ],
                    menBetween18AndT29: [
                        { $match: { gender: 'Hombre', age: { $gte: 18, $lte: 29 } } },
                        { $count: 'count' }
                    ],
                    womenBetween18AndT29: [
                        { $match: { gender: 'Mujer', age: { $gte: 18, $lte: 29 } } },
                        { $count: 'count' }
                    ],
                    menBetween13AndT17: [
                        { $match: { gender: 'Hombre', age: { $gte: 13, $lte: 17 } } },
                        { $count: 'count' }
                    ],
                    womenBetween13AndT17: [
                        { $match: { gender: 'Mujer', age: { $gte: 13, $lte: 17 } } },
                        { $count: 'count' }
                    ],
                    menBetween0AndT12: [
                        { $match: { gender: 'Hombre', age: { $gte: 0, $lte: 12 } } },
                        { $count: 'count' }
                    ],
                    womenBetween0AndT12: [
                        { $match: { gender: 'Mujer', age: { $gte: 0, $lte: 12 } } },
                        { $count: 'count' }
                    ],
                    totalPreescolar: [
                        { $match: { education: 'Preescolar'}},
                        { $count: 'count' }
                    ],
                    totalPrimaria: [
                        { $match: { education: 'Primaria' }},
                        { $count: 'count' }
                    ],
                    totalSecundaria: [
                        { $match: { education: 'Secundaria' }},
                        { $count: 'count' }
                    ],
                    totalPreparatoria: [
                        { $match: { education: 'Preparatoria' }},
                        { $count: 'count' }
                    ],
                    totalLicenciatura: [
                        { $match: { education: 'Licenciatura' }},
                        { $count: 'count' }
                    ],
                    totalPosgrado: [
                        { $match: { education: 'Posgrado' }},
                        { $count: 'count' }
                    ],
                    occupationHogar: [
                        { $match: { occupation: 'Hogar' }},
                        { $count: 'count' }
                    ],
                    occupationEmpleado: [
                        { $match: { occupation: 'Empleado' }},
                        { $count: 'count' }
                    ],
                    occupationEstudiante: [
                        { $match: { occupation: 'Estudiante' }},
                        { $count: 'count' }
                    ],
                    occupationDesocupado: [
                        { $match: { occupation: 'Desocupado' }},
                        { $count: 'count' }
                    ]  
                }
            }
        ]);

        // Función para obtener el conteo o devolver cero si no hay resultados
        const formatStats = (arr) => (arr && arr.length > 0) ? arr[0].count : 0;

        // Verificar si stats[0] está definido antes de acceder a las propiedades
        const formattedStats = {
            totalMen: formatStats(stats[0]?.totalMen),
            totalWomen: formatStats(stats[0]?.totalWomen),
            menOverSixty: formatStats(stats[0]?.menOverSixty),
            womenOverSixty: formatStats(stats[0]?.womenOverSixty),
            menBetween30And59: formatStats(stats[0]?.menBetween30And59),
            womenBetween30And59: formatStats(stats[0]?.womenBetween30And59),
            menBetween18AndT29: formatStats(stats[0]?.menBetween18AndT29),
            womenBetween18AndT29: formatStats(stats[0]?.womenBetween18AndT29),
            menBetween13AndT17: formatStats(stats[0]?.menBetween13AndT17),
            womenBetween13AndT17: formatStats(stats[0]?.womenBetween13AndT17),
            menBetween0AndT12: formatStats(stats[0]?.menBetween0AndT12),
            womenBetween0AndT12: formatStats(stats[0]?.womenBetween0AndT12),
            totalPreescolar: formatStats(stats[0].totalPreescolar),
            totalPrimaria: formatStats(stats[0].totalPrimaria),
            totalSecundaria: formatStats(stats[0].totalSecundaria),
            totalPreparatoria: formatStats(stats[0].totalPreparatoria),
            totalLicenciatura: formatStats(stats[0].totalLicenciatura),
            totalPosgrado: formatStats(stats[0].totalPosgrado),
            occupationHogar: formatStats(stats[0].occupationHogar),
            occupationEmpleado: formatStats(stats[0].occupationEmpleado),
            occupationEstudiante: formatStats(stats[0].occupationEstudiante),
            occupationDesocupado: formatStats(stats[0].occupationDesocupado)
        };

        res.json(formattedStats);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// export const countWomen = async (req, res) => {
//     try {
//         const womenCount = await Consults.countDocuments({ gender: 'Mujer'});
//         res.json({Mujeres: womenCount});
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// export const countMen = async (req, res) => {
//     try {
//         const MenCount = await Consults.countDocuments({ gender: 'Hombre'});
//         res.json({Hombres: MenCount});
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// };

// export const getMenOverSixty = async (req, res) => {
//     try {
//         const menOverSixty = await Consults.countDocuments({ gender: 'Hombre', age: { $gt: 60 } });
//         res.json({Mayores60: menOverSixty});
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// export const getWomanOverSixty = async (req, res) => {
//     try {
//         const womanOverSixty = await Consults.countDocuments({ gender: 'Mujer', age: { $gt: 60 } });
//         res.json({HombresMayores60: womanOverSixty});
//     } catch (error) {
//         res.status(500).json({ error: error.message });
//     }
// }

// export const getMenBetween20And59 = async (req, res) => {
//     try {
//         const menBetween20And59 = await Consults.countDocuments({gender: 'Hombre', age: {$gte: 30, $lte:59}});
//         res.json({HombresEntre20y59: menBetween20And59});
//     } catch (error) {
//         res.status(500).json({ error: error.messege });
//     }
// };

// export const getMenBetween18And29 = async (req, res) => {
//     try {
//         const menBetween18And29 = await Consults.countDocuments({gender: 'Hombre', age: {$gte: 18, $lte:29 }});
//         res.json({HombresEntre18y29: menBetween18And29});
//     } catch (error) {
//         res.status(500).json({ error: error.messege });
//     }
// };

// export const getMenBetween13And17 = async (req, res) => {
//     try {
//         const menBetween13And17 = await Consults.countDocuments({gender: 'Hombre', age: {$gte: 13, $lte:17 }});
//         res.json({HombresEntre13y17: menBetween13And17});
//     } catch (error) {
//         res.status(500).json({ error: error.messege });
//     }
// };

// export const getMenBetween0And12 = async (req, res) => {
//     try {
//         const menBetween0And12 = await Consults.countDocuments({gender: 'Hombre', age: {$gte: 0, $lte:12 }});
//         res.json({HombresEntre0y12: menBetween0And12});
//     } catch (error) {
//         res.status(500).json({ error: error.messege });
//     }
// };


