import { ObjectId } from 'bson';


export const availableAgentSorts = ['createdAt','updatedAt','memberLikes','memberView','memberRank',]
export const availableMembertSorts = ['createdAt','updatedAt','memberLikes','memberView',]


export const availableOptions = ['propertyBarter', 'propertyRent'];
export const availablePropertySorts =
 [
    'createdAt',
    'updatedAt',
    'memberLikes',
    'memberView',
    'propertyRank',
    'propertyPrice',
];

export const availableBoardArticleSorts = ['createdAt', 'updatedAt', 'articleLikes', 'articleViews'];

export const availableCommentSorts = ['createdAt', 'updatedAt',];

 // IMAGE CONFIGURATION (config.js)
 import { v4 as uuidv4 } from 'uuid';
 import * as path from 'path';
 
 export const validMimeTypes = ['image/png', 'image/jpg', 'image/jpeg'];
 export const getSerialForImage = (filename: string) => {
     const ext = path.parse(filename).ext;
     return uuidv4() + ext;
 };

export const shapeIntoMongoObjectId = (target: any) => {
    return typeof target === 'string' ? new ObjectId(target) : target;
};
/* LOOKUP MEMBER */
export const lookupMember = {
	$lookup: {
		from: 'members',
		localField: 'memberId',
		foreignField: '_id',
		as: 'memberData',
	},
};

/* LOOKUP FOLLOWING DATA */
export const lookupFollowingData = {
	$lookup: {
		from: 'members',
		localField: 'followingId',
		foreignField: '_id',
		as: 'followingData',
	},
};


/* LOOKUP FOLLOWER DATA */
export const lookupFollowerData = {
	$lookup: {
		from: 'members',
		localField: 'followerId',
		foreignField: '_id',
		as: 'followerData',
	},
};
