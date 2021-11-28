import { ProgramCardInfo } from "models/Program";
import { ClassCardInfo } from "models/Class";
import {
    EnrollmentCardInfo,
    VolunteeringCardInfo,
    WaitlistCardInfo,
} from "@models/Enroll";
import { ClassTranslation, locale, ProgramTranslation } from "@prisma/client";
import { TranslationUtil } from "./translationUtil";

// Converting Program and Class information from services/database/program-card-info.ts
// into Program/Class CardInfo objects for frontend
export class CardInfoUtil {
    /** Converts result of GET /api/class (all classes with program id) into ClassCardInfo
     * @param  {any[]} findResults raw results from api
     * @param  {locale} language locale used
     * @returns ClassCardInfo[]
     */
    static getClassCardInfos(findResults: any[], language: locale): ClassCardInfo[] {
        if (!findResults) return [];
        return findResults.map((result) => {
            return this.getClassCardInfo(result, language);
        });
    }

    /** Converts a single result of GET /api/class into a ClassCardInfo
     * @param  {any} result raw result from api
     * @param  {locale} language locale used
     * @returns ClassCardInfo
     */
    static getClassCardInfo(result: any, language: locale): ClassCardInfo {
        const mainClassTranslation: ClassTranslation =
            TranslationUtil.getMainClassTranslation(result.classTranslation, language);
        const mainProgramTranslation: ProgramTranslation =
            TranslationUtil.getMainProgramTranslation(
                result.program.programTranslation,
                language,
            );
        return {
            borderAge: result.borderAge,
            isAgeMinimal: result.isAgeMinimal,
            id: result.id,
            image: result.imageLink,
            stripePriceId: result.stripePriceId,
            spaceTotal: result.spaceTotal,
            spaceAvailable: result.spaceTotal - result._count?.parentRegs,
            spaceTaken: result._count?.parentRegs,
            volunteerSpaceTotal: result.volunteerSpaceTotal,
            volunteerSpaceAvailable:
                result.volunteerSpaceTotal - result._count?.volunteerRegs,
            volunteerSpaceTaken: result._count?.volunteerRegs,
            startDate: result.startDate,
            endDate: result.endDate,
            weekday: result.weekday,
            startTimeMinutes: result.startTimeMinutes,
            durationMinutes: result.durationMinutes,
            programId: result.program.id,
            programName: mainProgramTranslation ? mainProgramTranslation.name : "",
            name: mainClassTranslation ? mainClassTranslation.name : result.name,
            description: mainClassTranslation ? mainClassTranslation.description : "",
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

    /** Converts result of GET /api/program (get all programs) to ProgramCardInfo[]
     * @param  {any[]} findResults results from api
     * @param  {locale} language locale used
     * @returns ProgramCardInfo[]
     */
    static getProgramCardInfos(findResults: any[], language: locale): ProgramCardInfo[] {
        if (!findResults) return [];
        return findResults.map((p) => {
            return this.getProgramCardInfo(p, language);
        });
    }

    /** Converts result of GET /api/program/<pid> (get program with pid) to ProgramCardInfo
     * @param  {any} result raw result from api
     * @param  {locale} language locale used
     * @returns ProgramCardInfo
     */
    static getProgramCardInfo(result: any, language: locale): ProgramCardInfo {
        if (!result) return null;

        const mainProgramTranslation: ProgramTranslation =
            TranslationUtil.getMainProgramTranslation(
                result.programTranslation,
                language,
            );
        return {
            id: result.id,
            image: result.imageLink,
            name: mainProgramTranslation ? mainProgramTranslation.name : "",
            description: mainProgramTranslation ? mainProgramTranslation.description : "",
            startDate: result.startDate,
            endDate: result.endDate,
            tag: result.tag,
            onlineFormat: result.onlineFormat,
        };
    }

    /** Converts result of GET /api/enroll/child into EnrollmentCardInfo
     * @param  {any[]} findResults raw results form api
     * @param  {locale} language locale used
     * @returns EnrollmentCardInfo[]
     */
    static getEnrollmentCardInfos(
        findResults: any[],
        language: locale,
    ): EnrollmentCardInfo[] {
        if (!findResults) return [];
        return findResults.map((result) => {
            return this.getEnrollmentCardInfo(result, language);
        });
    }

    /** Converts a result of GET /api/enroll/child into EnrollmentCardInfo
     * @param  {any} result raw result from api
     * @param  {locale} language locale used
     * @returns EnrollmentCardInfo
     */
    static getEnrollmentCardInfo(result: any, language: locale): EnrollmentCardInfo {
        return {
            classId: result.classId,
            createdAt: result.createdAt,
            class: this.getClassCardInfo(result.class, language),
            student: result.student,
            program: this.getProgramCardInfo(result.class.program, language),
        };
    }

    /** Converts result of GET /api/waitlist into WaitlistCardInfo
     * @param  {any[]} findResults raw results form api
     * @param  {locale} language locale used
     * @returns WaitlistCardInfo[]
     */
    static getWaitlistCardInfos(
        findResults: any[],
        language: locale,
    ): WaitlistCardInfo[] {
        if (!findResults) return [];
        return findResults.map((result) => {
            return this.getWaitlistCardInfo(result, language);
        });
    }

    /** Converts a result of GET /api/waitlist into WaitlistCardInfo
     * @param  {any} result raw result from api
     * @param  {locale} language locale used
     * @returns WaitlistCardInfo
     */
    static getWaitlistCardInfo(result: any, language: locale): WaitlistCardInfo {
        return {
            classId: result.classId,
            createdAt: result.createdAt,
            class: this.getClassCardInfo(result.class, language),
            parent: result.parent,
            program: this.getProgramCardInfo(result.class.program, language),
        };
    }

    /** Converts results of GET /api/enroll/volunteer into VolunteeringCardInfo
     * @param  {any[]} findResults raw results from api
     * @param  {locale} language locale used
     * @returns VolunteeringCardInfo[]
     */
    static getVolunteeringCardInfos(
        findResults: any[],
        language: locale,
    ): VolunteeringCardInfo[] {
        if (!findResults) return [];
        return findResults.map((result) => {
            return this.getVolunteeringCardInfo(result, language);
        });
    }

    /** Converts a result of GET /api/enroll/volunteer into VolunteeringCardInfo
     * @param  {any} result raw result from api
     * @param  {locale} language locale used
     * @returns VolunteeringCardInfo
     */
    static getVolunteeringCardInfo(result: any, language: locale): VolunteeringCardInfo {
        return {
            classId: result.classId,
            createdAt: result.createdAt,
            class: this.getClassCardInfo(result.class, language),
            volunteer: result.volunteer,
            program: this.getProgramCardInfo(result.class.program, language),
        };
    }
}
export default CardInfoUtil;
