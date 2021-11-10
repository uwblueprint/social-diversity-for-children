import { Student } from "@prisma/client";
import { useState } from "react";
import { createContainer } from "unstated-next";

/**
 * Hook for managing the state of the students in class flow
 * @returns State and utils of Participants container
 */
function useParticipants(initialState = []) {
    const [students, setStudents] = useState<Student[]>(initialState);
    return { students, setStudents };
}

export default createContainer(useParticipants);
