import z from "zod";

const identityBadgeSchema = z.object({
    order: z.number(),
    source: z.enum(["DATA_ELEMENTS", "ATTRIBUTE"]),
    styled: z.boolean(),
    variable: z.string().optional(),
});

const identityPhotoSchema = z.object({
    attribute: z.string(),
});

const identityTextSchema = z.object({
    attributes: z.array(z.string()),
    separator: z.string(),
});

const identityCardSchema = z.object({
    badges: z.array(identityBadgeSchema),
    photo: identityPhotoSchema,
    subtitle: identityTextSchema,
    title: identityTextSchema,
});

const eventDetailsSchema = z.object({
    pageSize: z.number(),
    programStage: z.string(),
});

const profileComponentSchema = z.object({
    type: z.enum(["TEI_FORM", "EVENT_CARDS", "EVENT_TABLE"]),
    displayName: z.string(),
    editable: z.boolean(),
    order: z.number(),
    size: z.string(),
    details: eventDetailsSchema.optional(),
});

const profileTabSchema = z.object({
    color: z.string(),
    components: z.array(profileComponentSchema),
    createdAt: z.number(),
    displayName: z.string(),
    id: z.string(),
    order: z.number(),
});

export const profileConfigSchema = z.object({
    identityCard: identityCardSchema,
    program: z.string(),
    tabs: z.array(profileTabSchema),
})
