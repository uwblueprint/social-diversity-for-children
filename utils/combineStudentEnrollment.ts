import { EnrollmentCardInfo } from "@models/Enroll";
import { CombinedEnrollmentCardInfo } from "@models/Enroll";

/**
 * Combines student enrolment card information for class page
 * @param enrollmentInfo collection of enrollment card information
 * @returns combined student enrolment card information for class page
 */
export default function combineStudentEnrollment(
    enrollmentInfo: EnrollmentCardInfo[],
): CombinedEnrollmentCardInfo[] {
    const enrolls = enrollmentInfo.map((info) => {
        const { student, ...rest } = info;
        return {
            ...rest,
            students: [student],
        };
    });

    // we loop through the enrollment infos, keep track via a map
    const enrollMap: Map<number, CombinedEnrollmentCardInfo> = new Map();
    enrolls.forEach((enroll) => {
        if (enrollMap.has(enroll.classId)) {
            enrollMap.get(enroll.classId).students.push(...enroll.students);
        } else {
            enrollMap.set(enroll.classId, enroll);
        }
    });

    return Array.from(enrollMap.values());
}
