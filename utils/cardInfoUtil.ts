import { ProgramCardInfo } from "models/Program";
import { ClassCardInfo } from "models/Class";

export class CardInfoUtil {
    static getClassCardInfo(findResults: any[]): ClassCardInfo[] {
        if (!findResults) return [];
        return findResults.map((result) => {
            return {
                ageGroup: result.ageGroup,
                spaceTotal: result.spaceTotal,
                id: result.id,
                image: result.imageLink,
                spaceAvailable: result.spaceAvailable,
                volunteerSpaceTotal: result.volunteerSpaceTotal,
                volunteerSpaceAvailable: result.volunteerSpaceAvailable,
                startDate: result.startDate,
                endDate: result.endDate,
                weekday: result.weekday,
                startTimeMinutes: result.startTimeMinutes,
                durationMinutes: result.durationMinutes,
                name:
                    result.classTranslation.length > 0
                        ? result.classTranslation[0].name
                        : result.name,
                description:
                    result.classTranslation.length > 0
                        ? result.classTranslation[0].description
                        : "",
                teacherName:
                    result.teacherRegs.length > 0
                        ? result.teacherRegs[0].teacher.user.firstName +
                          " " +
                          result.teacherRegs[0].teacher.user.lastName
                        : "",
                teacherEmail:
                    result.teacherRegs.length > 0
                        ? result.teacherRegs[0].teacher.user.email
                        : "",
                teacherImage:
                    result.teacherRegs.length > 0
                        ? result.teacherRegs[0].teacher.user.image
                        : "",
            };
        });
    }
    static getProgramCardInfos(findResult: any[]): ProgramCardInfo[] {
        if (!findResult) return [];
        return findResult.map((p) => {
            return {
                id: p.id,
                image: p.imageLink,
                price: p.price,
                name:
                    p.programTranslation.length > 0
                        ? p.programTranslation[0].name
                        : "",
                description:
                    p.programTranslation.length > 0
                        ? p.programTranslation[0].description
                        : "",
                startDate: p.startDate,
                endDate: p.endDate,
                tag: p.tag,
                onlineFormat: p.onlineFormat,
            };
        });
    }
    static getProgramCardInfo(findResult): ProgramCardInfo {
        if (!findResult) return null;
        return {
            id: findResult.id,
            image: findResult.imageLink,
            price: findResult.price,
            name:
                findResult.programTranslation.length > 0
                    ? findResult.programTranslation[0].name
                    : "",
            description:
                findResult.programTranslation.length > 0
                    ? findResult.programTranslation[0].description
                    : "",
            startDate: findResult.startDate,
            endDate: findResult.endDate,
            tag: findResult.tag,
            onlineFormat: findResult.onlineFormat,
        };
    }
}
export default CardInfoUtil;
