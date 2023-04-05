
import { restauRentModel } from "../models.js";

export const getRestaurents = async (req, res, next) => {
    const objQuery = { ...req.query };
    let limit, skip, sort, project = {};
    for (let key in objQuery) {
        if (objQuery[key].includes('|') && key.endsWith('NotIn')) {
            const arrNotIn = objQuery[key].split('|');
            let newKey = key.split('NotIn')[0];
            objQuery[newKey] = { $nin: arrNotIn };
            delete objQuery[key];
        }
        if (typeof objQuery[key] === 'string' && objQuery[key].includes('|')) {
            const arrOr = objQuery[key].split('|');
            objQuery.$or = [];
            for (const item of arrOr) {
                objQuery.$or = [...objQuery.$or, { [key]: item }];
            }
            delete objQuery[key];
        }
        if (typeof objQuery[key] === 'string' && objQuery[key].indexOf('not=') === 0) {
            objQuery[key] = { $ne: objQuery[key].split('not=')[1] };
        }
    }
    if (objQuery.limit) {
        limit = Number(objQuery.limit);
        delete objQuery.limit;
    } else limit = 0;
    if (objQuery.skip) {
        skip = Number(objQuery.skip);
        delete objQuery.skip;
    } else skip = 0;
    if (objQuery.sort) {
        sort = { [objQuery.sort.split('=')[0]]: Number(objQuery.sort.split('=')[1]) };
        delete objQuery.sort;
    }

    if (objQuery.project) {
        const displayedFields = objQuery.project.split(',');
        for (const key of displayedFields) {
            project[key] = 1;
            if (key === '_id=false') {
                project._id = 0;
            }
        }
        delete objQuery.project;
    }


    if (objQuery.score) {
        if (objQuery.score.includes('min') && objQuery.score.includes('max')) {
            const seprateArr = objQuery.score.split('-');
            objQuery.grades = { $elemMatch: { score: { $gt: Number(seprateArr[1]), $lt: Number(seprateArr[3]) } } };
        } else if (objQuery.score.includes('min')) {
            const seprateArr = objQuery.score.split('-');
            objQuery.grades = { $elemMatch: { score: { $gt: Number(seprateArr[1]) } } };
        } else if (objQuery.score.includes('max')) {
            const seprateArr = objQuery.score.split('-');
            objQuery.grades = { $elemMatch: { score: { $lt: Number(seprateArr[1]) } } };
            // console.log(objQuery.grades.$elemMatch.score);
        }

        if (objQuery.score.includes('not>')) {
            objQuery['grades.score'] = { $not: { $gt: Number(objQuery.score.split('>')[1]) } };
        }

        delete objQuery.score;
    }

    if (objQuery.grade) {
        objQuery.grades = { $elemMatch: { grade: objQuery.grade } };
        delete objQuery.grade;
    }

    if (objQuery.latitude) {
        const seprateArr = objQuery.latitude.split('=');
        objQuery['address.coord'] = { $lt: Number(seprateArr[1]) };
        delete objQuery.latitude;
    }

    if (objQuery.startName) {
        objQuery.name = { $regex: '^' + objQuery.startName};
        delete objQuery.startName;
    }

    if (objQuery.lastName) {
        objQuery.name = { $regex: objQuery.lastName + '$' };
        delete objQuery.lastName;
    }

    if (objQuery.includesName) {
        objQuery.name = { $regex: '.*' + objQuery.includesName + '.*' };
        delete objQuery.includesName;
    }

    console.log(objQuery);
    console.log(limit, skip, sort, project)
    try {
        const data = await restauRentModel.find(objQuery).limit(limit).skip(skip).sort(sort).project(project).toArray();
        res.json(data);
    } catch (err) {
        console.log(err);
        next(err);
    }
}

export const getRestaurents_21 = async (req, res, next) => {
    try {
        const data = await restauRentModel.find({
            $or: [
                {
                    $and: [
                        { cuisine: { $ne: 'American ' } },
                        { cuisine: { $ne: 'Chinese' } }
                    ]
                },
                { name: { $regex: 'Wil.*' } }
            ]
        }).project({
            restaurant_id: 1,
            name: 1,
            borough: 1,
            cuisine: 1
        }).toArray();
        res.status(200).json(data);
    } catch (err) {
        next(err);
    }
}

export const getRestaurents_22 = async (req, res, next) => {
    try {
        const data = await restauRentModel.find({
            'grades.grade': 'A',
            'grades.score': 11,
            'grades.date': new Date('2014-08-11T00:00:00Z')
        }).project({
            restaurant_id: 1,
            name: 1,
            grades: 1
        }).toArray();
        res.status(200).json(data);
    } catch(err) {
        next(err);
    }
}

export const getRestaurents_23 = async (req, res, next) => {
    try {
        const data = await restauRentModel.find({
            'grades.1.grade': 'A',
            'grades.1.score': 9,
            'grades.1.date': new Date('2014-08-11T00:00:00Z')
        }).project({
            restaurant_id: 1,
            name: 1,
            grades: 1
        }).toArray();
        res.status(200).json(data);
    } catch(err) {
        next(err);
    }
}

export const getRestaurents_24 = async (req, res, next) => {
    try {
        const data = await restauRentModel.find({
            'address.coord.1': {$gt: 42, $lt: 52}
        }).project({
            restaurant_id: 1,
            name: 1,
            address: 1
        }).toArray();
        res.status(200).json(data);
    } catch(err) {
        next(err);
    }
}

export const getRestaurents_27 = async (req, res, next) => {
    try {
        const data = await restauRentModel.find({}).sort({
            cuisine: 1,
            borough: -1
        }).toArray();
        res.status(200).json(data);
    } catch(err) {
        next(err);
    }
}

export const getRestaurents_28 = async (req, res, next) => {
    try {
        const data = await restauRentModel.find({'address.street': {$exists: true}}).toArray();
        const isTrue = data.length === await restauRentModel.countDocuments();
        res.status(200).json({
            message: isTrue? "all documents includes street" : "all documents not includes street",
            data
        });
    } catch(err) {
        next(err);
    }
}

export const getRestaurents_29 = async (req, res, next) => {
    try {
        const data = await restauRentModel.find({'address.coord': {$type: 1}}).toArray();
        res.status(200).json(data);
    } catch(err) {
        next(err);
    }
}

export const getRestaurents_30 = async (req, res, next) => {
    try {
        const data = await restauRentModel.find({
            'grades.score': {$mod: [7,0]}
        }).project({
            restaurant_id: 1,
            name: 1,
            grades: 1
        }).toArray();
        res.status(200).json(data);
    } catch(err) {
        next(err);
    }
}

export const getRestaurents_37 = async (req, res, next) => {
    try {
        const data = await restauRentModel.find({
            'grades.score': {$lt: 5},
            borough: {$in: ['Manhattan', 'Brooklyn']},
            cuisine: {$ne: 'American '}
        }).toArray();
        res.status(200).json(data);
    } catch(err) {
        next(err);
    }
}

// 38+39
export const getRestaurents_38_42 = async (req, res, next) => {
    const objQuery = { ...req.query };
    for (let key in objQuery) {
        if (objQuery[key].includes('|') && key.endsWith('NotIn')) {
            const arrNotIn = objQuery[key].split('|');
            let newKey = key.split('NotIn')[0];
            objQuery[newKey] = { $nin: arrNotIn };
            delete objQuery[key];
        }
        if (typeof objQuery[key] === 'string' && objQuery[key].includes('|')) {
            console.log(objQuery[key])
            const arrOr = objQuery[key].split('|');
            objQuery.$or = [];
            for (const item of arrOr) {
                objQuery.$or = [...objQuery.$or, { [key]: item }];
            }
            delete objQuery[key];
        }
        if (typeof objQuery[key] === 'string' && objQuery[key].indexOf('not=') === 0) {
            objQuery[key] = { $ne: objQuery[key].split('not=')[1] };
        }
    }
    try {
        const data = await restauRentModel.find({
            $and: [
                objQuery,
                {'grades.score': 2},
                {'grades.score': 6}
            ]
        }).toArray();
        res.status(200).json(data);
    } catch(err) {
        next(err);
    }
}

export const getRestaurents_43_47 = async (req, res, next) => {
    const objQuery = { ...req.query };
    for (let key in objQuery) {
        if (objQuery[key].includes('|') && key.endsWith('NotIn')) {
            const arrNotIn = objQuery[key].split('|');
            let newKey = key.split('NotIn')[0];
            objQuery[newKey] = { $nin: arrNotIn };
            delete objQuery[key];
        }
        if (typeof objQuery[key] === 'string' && objQuery[key].includes('|')) {
            const arrOr = objQuery[key].split('|');
            objQuery.$or = [];
            for (const item of arrOr) {
                objQuery.$or = [...objQuery.$or, { [key]: item }];
            }
            delete objQuery[key];
        }
        if (typeof objQuery[key] === 'string' && objQuery[key].indexOf('not=') === 0) {
            objQuery[key] = { $ne: objQuery[key].split('not=')[1] };
        }
    }
    console.log(objQuery);

    try {
        const data = await restauRentModel.find({
            $and: [
                objQuery,
                {$or: [
                    {'grades.score': 2},
                    {'grades.score': 6}
                ]}
            ]
        }).toArray();
        res.status(200).json(data);
    } catch(err) {
        next(err);
    }
}

export const getRestaurents_48 = async (req, res, next) => {
    try {
        const data = await restauRentModel.find({
            grades: {
                $not: {
                    $elemMatch: {
                        score: {$lte: 5}
                    }
                }
            }
        }).toArray();
        res.status(200).json(data);
    } catch(err) {
        next(err);
    }
}

/*
    1: http://localhost:3002/restaurents
    2: http://localhost:3002/restaurents?project=restaurant_id,name,borough,cuisine
    3: http://localhost:3002/restaurents?project=restaurant_id,name,borough,cuisine,_id=false
    4: http://localhost:3002/restaurents?project=restaurant_id,name,borough,address.zipcode,_id=false
    5: http://localhost:3002/restaurents?borough=Bronx
    6: http://localhost:3002/restaurents?borough=Bronx&limit=5
    7: http://localhost:3002/restaurents?borough=Bronx&limit=5&skip=5
    8: http://localhost:3002/restaurents?score=min-90
    9: http://localhost:3002/restaurents?score=min-80-max-100
    10: http://localhost:3002/restaurents?latitude=max=-95.754168
    11: http://localhost:3002/restaurents?cuisine=American%20&score=min-70&latitude=max=-65.754168
    12: http://localhost:3002/restaurents?cuisine=not=American &score=min-70&latitude=max=-65.754168
    13: http://localhost:3002/restaurents?cuisine=not=American &grade=A&borough=not=Brooklyn&sort=cuisine=-1 
    14: http://localhost:3002/restaurents?project=restaurant_id,name,borough,cuisine&startName=Wil
    15: http://localhost:3002/restaurents?project=restaurant_id,name,borough,cuisine&lastName=ces
    16: http://localhost:3002/restaurents?project=restaurant_id,name,borough,cuisine&includesName=Reg
    17: http://localhost:3002/restaurents?borough=Bronx&cuisine=American |Chinese
    18: http://localhost:3002/restaurents?project=restaurant_id,name,borough,cuisine&borough=Staten Island|Queens|Bronx|Brooklyn
    19: http://localhost:3002/restaurents?project=restaurant_id,name,borough,cuisine&boroughNotIn=Staten Island|Queens|Bronx|Brooklyn
    20: http://localhost:3002/restaurents?project=restaurant_id,name,borough,cuisine&score=not%3E10
    21: http://localhost:3002/restaurents/21
    22: http://localhost:3002/restaurents/22
    23: http://localhost:3002/restaurents/23
    24: http://localhost:3002/restaurents/24
    25: http://localhost:3002/restaurents?sort=name=1
    26: http://localhost:3002/restaurents?sort=name=-1
    27: http://localhost:3002/restaurents/27
    28: http://localhost:3002/restaurents/28
    29: http://localhost:3002/restaurents/29
    30: http://localhost:3002/restaurents/30
    31: http://localhost:3002/restaurents?project=name,borough,address.coord,cuisine&includesName=mon
    32: http://localhost:3002/restaurents?project=name,borough,address.coord,cuisine&startName=Mad
    33: http://localhost:3002/restaurents?score=max-5
    34: http://localhost:3002/restaurents?score=max-5&borough=Manhattan
    35: http://localhost:3002/restaurents?score=max-5&borough=Manhattan|Brooklyn
    36: http://localhost:3002/restaurents?score=max-5&cuisine=not=American &borough=Manhattan|Brooklyn
    37: http://localhost:3002/restaurents/37
    38: http://localhost:3002/restaurents/38_42
    39: http://localhost:3002/restaurents/38_42?borough=Manhattan
    40: http://localhost:3002/restaurents/38_42?borough=Manhattan|Brooklyn
    41: http://localhost:3002/restaurents/38_42?cuisine=not=American &borough=Manhattan|Brooklyn
    42: http://localhost:3002/restaurents/38_42?borough=Manhattan|Brooklyn&cuisineNotIn=American |Chinese
    43: http://localhost:3002/restaurents/43_47
    44: http://localhost:3002/restaurents/43_47?borough=Manhattan
    45: http://localhost:3002/restaurents/43_47?borough=Manhattan|Brooklyn
    46: http://localhost:3002/restaurents/43_47?cuisine=not=American%20&borough=Manhattan|Brooklyn
    47: http://localhost:3002/restaurents/43_47?cuisine=not=American%20&borough=Manhattan|Brooklyn
    48: http://localhost:3002/restaurents/48
*/