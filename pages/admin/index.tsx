import { locale } from "@prisma/client";
import { Button, ButtonProps } from "@chakra-ui/button";
import Icon from "@chakra-ui/icon";
import { ArrowForwardIcon } from "@chakra-ui/icons";
import {
    Box,
    Heading,
    HStack,
    VStack,
    Text,
    Link as ChakraLink,
    Center,
    CenterProps,
} from "@chakra-ui/layout";
import {
    AspectRatio,
    Flex,
    Grid,
    GridItem,
    List,
    ListItem,
    Spacer,
    Image,
} from "@chakra-ui/react";
import Wrapper from "@components/AdminWrapper";
import LiveIcon from "@components/icons/LiveIcon";
import colourTheme from "@styles/colours";
import useUpcomingClasses from "@utils/hooks/useUpcomingClasses";
import Link from "next/link";
import React from "react";
import { IconType } from "react-icons";
import { MdClass, MdCreate, MdPeople } from "react-icons/md";
import { RiCouponFill } from "react-icons/ri";
import useStats from "@utils/hooks/useStats";
import { ClassCardInfo } from "@models/Class";
import { AgeBadge } from "@components/AgeBadge";
import convertToShortTimeRange from "@utils/convertToShortTimeRange";
import { SDCButton } from "@components/SDCButton";
import { weekdayToString } from "@utils/enum/weekday";
import { useRouter } from "next/router";

type AdminProps = {
    session: Record<string, unknown>;
};

export const EmptyState: React.FC<CenterProps> = ({
    children,
    ...props
}): JSX.Element => {
    return (
        <Center
            bg={colourTheme.colors.LightGray}
            w="100%"
            py={"40px"}
            px={"64px"}
            color={colourTheme.colors.Gray}
            border="1px"
            borderColor={colourTheme.colors.Sliver}
            {...props}
        >
            {children}
        </Center>
    );
};

const LiveClassCard: React.FC<{ cardInfo: ClassCardInfo }> = ({ cardInfo }) => {
    return (
        <Center
            w={380}
            h={350}
            border="1px"
            borderColor={colourTheme.colors.Sliver}
        >
            <VStack mx={9} spacing={6} align="flex-start">
                <AgeBadge
                    isAgeMinimal={cardInfo.isAgeMinimal}
                    borderAge={cardInfo.borderAge}
                    isAdminTheme
                />
                <Heading size="md">
                    {cardInfo.programName} ({cardInfo.name})
                </Heading>
                <Text color={colourTheme.colors.Gray} fontSize="sm">
                    {convertToShortTimeRange(
                        cardInfo.startTimeMinutes,
                        cardInfo.durationMinutes,
                    )}
                    {" with Teacher " + cardInfo.teacherName}
                </Text>
                <Text color={colourTheme.colors.Gray} fontSize="sm">
                    {cardInfo.spaceTaken} participant
                    {cardInfo.spaceTaken > 1 ? "s" : ""} registered
                    <br />
                    {cardInfo.volunteerSpaceTaken} volunteer
                    {cardInfo.volunteerSpaceTaken > 1 ? "s" : ""} registered
                </Text>
                <SDCButton py={4} width="100%">
                    Join Class
                </SDCButton>
            </VStack>
        </Center>
    );
};

const UpcomingClassCard: React.FC<{ cardInfo: ClassCardInfo }> = ({
    cardInfo,
}) => {
    const router = useRouter();

    return (
        <Grid
            templateColumns="repeat(4, 1fr)"
            gap={6}
            cursor={"pointer"}
            h={165}
            borderColor={colourTheme.colors.Sliver}
            borderWidth={1}
            _hover={{ borderColor: colourTheme.colors.Gray }}
            onClick={() => router.push(`/admin/class/${cardInfo.id}`)}
        >
            <GridItem>
                <AspectRatio width="100%" ratio={1}>
                    <Image
                        src={cardInfo.image}
                        fit="cover"
                        alt={cardInfo.name}
                    />
                </AspectRatio>
            </GridItem>
            <GridItem colSpan={3}>
                <VStack align="left" justify="center" height="100%" spacing={3}>
                    <Flex mr="3">
                        <Heading size="md">{cardInfo.name}</Heading>
                        <Spacer />
                        {cardInfo.borderAge == null ? null : (
                            <AgeBadge
                                isAgeMinimal={cardInfo.isAgeMinimal}
                                borderAge={cardInfo.borderAge}
                                isAdminTheme
                            />
                        )}
                    </Flex>
                    <Flex>
                        <Box
                            as="span"
                            color={colourTheme.colors.Gray}
                            fontSize="sm"
                        >
                            {weekdayToString(cardInfo.weekday, locale.en)}{" "}
                            {convertToShortTimeRange(
                                cardInfo.startTimeMinutes,
                                cardInfo.durationMinutes,
                            )}
                        </Box>
                        <Box as="span" color="gray.600" fontSize="sm" ml="1">
                            {" with Teacher " + cardInfo.teacherName}
                        </Box>
                    </Flex>
                    <Flex
                        color={colourTheme.colors.Gray}
                        fontSize="sm"
                        align=""
                    >
                        <Text>
                            {cardInfo.spaceTaken} participant
                            {cardInfo.spaceTaken > 1 ? "s" : ""} registered
                        </Text>
                        <Text ml={10}>
                            {cardInfo.volunteerSpaceTaken} volunteer
                            {cardInfo.volunteerSpaceTaken > 1 ? "s" : ""}{" "}
                            registered
                        </Text>
                    </Flex>
                </VStack>
            </GridItem>
        </Grid>
    );
};

const AdminOptionButton: React.FC<
    ButtonProps & {
        icon: IconType;
        label: string;
        href?: string;
        isExternal?: boolean;
    }
> = ({ icon, label, href, isExternal, ...props }) => {
    const button = (
        <ChakraLink
            isExternal={isExternal}
            href={href && isExternal ? href : undefined}
            textDecoration="none"
            rounded={"md"}
            _active={{}}
            _hover={{}}
        >
            <Button
                border="2px"
                borderColor={colourTheme.colors.Sliver}
                px={9}
                py="24px"
                backgroundColor="white"
                _active={{}}
                _focus={{}}
                borderRadius={"6px"}
                fontWeight="normal"
                {...props}
            >
                <Icon mr={2} as={icon} />
                {label}
            </Button>
        </ChakraLink>
    );

    return href && !isExternal ? <Link href={href}>{button}</Link> : button;
};

const AdminStatBox: React.FC<
    CenterProps & {
        amount: number;
        label: string;
    }
> = ({ amount, label, ...props }) => {
    return (
        <Center
            w={250}
            h={130}
            border="1px"
            borderColor={colourTheme.colors.Sliver}
            {...props}
        >
            <Box>
                <Heading>{amount}</Heading>
                <Text color={colourTheme.colors.Gray}>{label}</Text>
            </Box>
        </Center>
    );
};

export default function Admin(props: AdminProps): JSX.Element {
    // At the start, we want three categories of stats
    // First is all the numerical stats, this should be really straight forward, get /admin/stats maybe...
    // Use upcoming classes, get up to three upcoming classes
    const { liveClass, upcomingClasses } = useUpcomingClasses(locale.en);

    const { totalRegistrants, totalPrograms, totalClasses, totalTeachers } =
        useStats();

    // Figure out if there are any "live" classes, the rest are upcoming classes, which we limit to 2

    return (
        <Wrapper session={props.session}>
            <VStack spacing={6} mx={8}>
                <HStack spacing={4} mt={8} w="100%">
                    <AdminOptionButton
                        icon={MdCreate}
                        label="Create new Class"
                        href="/admin/class"
                    />
                    <AdminOptionButton
                        icon={MdClass}
                        label="Create new Program"
                        href="/admin/program"
                    />
                    <AdminOptionButton
                        icon={MdPeople}
                        label="Add Registrant"
                        href="/admin/registrant"
                    />
                    <AdminOptionButton
                        icon={RiCouponFill}
                        label="Add Coupon Code"
                        href="https://dashboard.stripe.com/coupons"
                        isExternal
                    />
                </HStack>
                <Heading size="sm" alignSelf="flex-start" fontWeight="normal">
                    Overview and Analytics
                </Heading>
                <HStack>
                    <AdminStatBox
                        amount={totalRegistrants}
                        label="Total Registrants"
                    />
                    <AdminStatBox
                        amount={totalPrograms}
                        label="Total Programs"
                    />
                    <AdminStatBox amount={totalClasses} label="Total Classes" />
                    <AdminStatBox
                        amount={totalTeachers}
                        label="Total Teachers"
                    />
                </HStack>
                <HStack w="100%" spacing={5}>
                    <Box>
                        <Flex alignItems="baseline" mb={5}>
                            <LiveIcon />
                            <Text ml={4}>Live Class</Text>
                        </Flex>
                        {/* Here, we either show loading, empty, or box */}
                        {liveClass ? (
                            <LiveClassCard cardInfo={liveClass} />
                        ) : (
                            <EmptyState w={380} h={350}>
                                No classes are live
                            </EmptyState>
                        )}
                    </Box>
                    <Box>
                        <Flex mb={5}>
                            Upcoming Classes
                            <Spacer />
                            <Link href="/admin/program">
                                <ChakraLink color={colourTheme.colors.Blue}>
                                    See all
                                    <ArrowForwardIcon ml={4} />
                                </ChakraLink>
                            </Link>
                        </Flex>
                        <VStack h={350}>
                            {upcomingClasses ? (
                                <List spacing={5} w={625}>
                                    {upcomingClasses
                                        .slice(0, 2)
                                        .map((item, idx) => {
                                            return (
                                                <ListItem key={idx}>
                                                    <UpcomingClassCard
                                                        cardInfo={item}
                                                    />
                                                </ListItem>
                                            );
                                        })}
                                </List>
                            ) : (
                                <EmptyState w={625} h="100%">
                                    No upcoming classes this week
                                </EmptyState>
                            )}
                        </VStack>
                    </Box>
                </HStack>
            </VStack>
        </Wrapper>
    );
}
