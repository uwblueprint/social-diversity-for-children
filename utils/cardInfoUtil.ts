import { ProgramCardInfo } from "models/Program";
import { ClassCardInfo } from "models/Class";
import { EnrollmentCardInfo, VolunteeringCardInfo } from "@models/Enroll";

// Converting Program and Class information from services/database/program-card-info.ts
// into Program/Class CardInfo objects for frontend
export class CardInfoUtil {
    // Converts result of GET /api/class (all classes with program id) into ClassCardInfo
    static getClassCardInfos(findResults: any[]): ClassCardInfo[] {
        if (!findResults) return [];
        return findResults.map((result) => {
            return this.getClassCardInfo(result);
        });
    }

    // Converts a single result of GET /api/class into a ClassCardInfo
    static getClassCardInfo(result: any): ClassCardInfo {
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
    }

    // Converts result of GET /api/program (get all programs) to ProgramCardInfo[]
    static getProgramCardInfos(findResults: any[]): ProgramCardInfo[] {
        if (!findResults) return [];
        return findResults.map((p) => {
            return this.getProgramCardInfo(p);
        });
    }
    // Converts result of GET /api/program/<pid> (get program with pid) to ProgramCardInfo
    static getProgramCardInfo(result: any): ProgramCardInfo {
        if (!result) return null;
        return {
            id: result.id,
            image: result.imageLink,
            price: result.price,
            name:
                result.programTranslation.length > 0
                    ? result.programTranslation[0].name
                    : "",
            description:
                result.programTranslation.length > 0
                    ? result.programTranslation[0].description
                    : "",
            startDate: result.startDate,
            endDate: result.endDate,
            tag: result.tag,
            onlineFormat: result.onlineFormat,
        };
    }

    // Converts result of GET /api/enroll/child into EnrollmentCardInfo
    static getEnrollmentCardInfos(findResults: any[]): EnrollmentCardInfo[] {
        if (!findResults) return [];
        return findResults.map((result) => {
            return this.getEnrollmentCardInfo(result);
        });
    }

    // Converts a result of GET /api/enroll/child into EnrollmentCardInfo
    static getEnrollmentCardInfo(result: any): EnrollmentCardInfo {
        return {
            classId: result.classId,
            createdAt: result.createdAt,
            class: this.getClassCardInfo(result.class),
            student: result.student,
            program: this.getProgramCardInfo(result.class.program),
        };
    }

    // Converts results of GET /api/enroll/volunteer into VolunteeringCardInfo
    static getVolunteeringCardInfos(
        findResults: any[],
    ): VolunteeringCardInfo[] {
        if (!findResults) return [];
        return findResults.map((result) => {
            return this.getVolunteeringCardInfo(result);
        });
    }

    // Converts a result of GET /api/enroll/volunteer into VolunteeringCardInfo
    static getVolunteeringCardInfo(result: any): VolunteeringCardInfo {
        return {
            classId: result.classId,
            createdAt: result.createdAt,
            class: this.getClassCardInfo(result.class),
            volunteer: result.volunteer,
            program: this.getProgramCardInfo(result.class.program),
        };
    }
}
export default CardInfoUtil;
