import { z } from 'zod'
import type { Prisma } from '../prisma'

/////////////////////////////////////////
// HELPER FUNCTIONS
/////////////////////////////////////////

/////////////////////////////////////////
// ENUMS
/////////////////////////////////////////

export const TransactionIsolationLevelSchema = z.enum([
  'ReadUncommitted',
  'ReadCommitted',
  'RepeatableRead',
  'Serializable',
])

export const UserScalarFieldEnumSchema = z.enum([
  'id',
  'name',
  'email',
  'emailVerified',
  'image',
  'createdAt',
  'updatedAt',
])

export const SessionScalarFieldEnumSchema = z.enum([
  'id',
  'expiresAt',
  'token',
  'createdAt',
  'updatedAt',
  'ipAddress',
  'userAgent',
  'userId',
])

export const AccountScalarFieldEnumSchema = z.enum([
  'id',
  'accountId',
  'providerId',
  'userId',
  'accessToken',
  'refreshToken',
  'idToken',
  'accessTokenExpiresAt',
  'refreshTokenExpiresAt',
  'scope',
  'password',
  'createdAt',
  'updatedAt',
])

export const VerificationScalarFieldEnumSchema = z.enum([
  'id',
  'identifier',
  'value',
  'expiresAt',
  'createdAt',
  'updatedAt',
])

export const CategoryScalarFieldEnumSchema = z.enum(['id', 'name', 'emoji'])

export const ThreadScalarFieldEnumSchema = z.enum([
  'id',
  'title',
  'brief',
  'content',
  'isFlagged',
  'flagReason',
  'categoryId',
  'userId',
  'createdAt',
  'updatedAt',
])

export const SortOrderSchema = z.enum(['asc', 'desc'])

export const QueryModeSchema = z.enum(['default', 'insensitive'])

export const NullsOrderSchema = z.enum(['first', 'last'])
/////////////////////////////////////////
// MODELS
/////////////////////////////////////////

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  emailVerified: z.boolean(),
  image: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// SESSION SCHEMA
/////////////////////////////////////////

export const SessionSchema = z.object({
  id: z.string(),
  expiresAt: z.coerce.date(),
  token: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  ipAddress: z.string().nullable(),
  userAgent: z.string().nullable(),
  userId: z.string(),
})

export type Session = z.infer<typeof SessionSchema>

/////////////////////////////////////////
// ACCOUNT SCHEMA
/////////////////////////////////////////

export const AccountSchema = z.object({
  id: z.string(),
  accountId: z.string(),
  providerId: z.string(),
  userId: z.string(),
  accessToken: z.string().nullable(),
  refreshToken: z.string().nullable(),
  idToken: z.string().nullable(),
  accessTokenExpiresAt: z.coerce.date().nullable(),
  refreshTokenExpiresAt: z.coerce.date().nullable(),
  scope: z.string().nullable(),
  password: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Account = z.infer<typeof AccountSchema>

/////////////////////////////////////////
// VERIFICATION SCHEMA
/////////////////////////////////////////

export const VerificationSchema = z.object({
  id: z.string(),
  identifier: z.string(),
  value: z.string(),
  expiresAt: z.coerce.date(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Verification = z.infer<typeof VerificationSchema>

/////////////////////////////////////////
// CATEGORY SCHEMA
/////////////////////////////////////////

export const CategorySchema = z.object({
  id: z.cuid(),
  name: z.string(),
  emoji: z.string(),
})

export type Category = z.infer<typeof CategorySchema>

/////////////////////////////////////////
// THREAD SCHEMA
/////////////////////////////////////////

export const ThreadSchema = z.object({
  id: z.cuid(),
  title: z.string(),
  brief: z.string(),
  content: z.string(),
  isFlagged: z.boolean(),
  flagReason: z.string().nullable(),
  categoryId: z.string(),
  userId: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
})

export type Thread = z.infer<typeof ThreadSchema>

/////////////////////////////////////////
// SELECT & INCLUDE
/////////////////////////////////////////

// USER
//------------------------------------------------------

export const UserIncludeSchema: z.ZodType<Prisma.UserInclude> = z
  .object({
    sessions: z
      .union([z.boolean(), z.lazy(() => SessionFindManyArgsSchema)])
      .optional(),
    accounts: z
      .union([z.boolean(), z.lazy(() => AccountFindManyArgsSchema)])
      .optional(),
    threads: z
      .union([z.boolean(), z.lazy(() => ThreadFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict()

export const UserArgsSchema: z.ZodType<Prisma.UserDefaultArgs> = z
  .object({
    select: z.lazy(() => UserSelectSchema).optional(),
    include: z.lazy(() => UserIncludeSchema).optional(),
  })
  .strict()

export const UserCountOutputTypeArgsSchema: z.ZodType<Prisma.UserCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z.lazy(() => UserCountOutputTypeSelectSchema).nullish(),
    })
    .strict()

export const UserCountOutputTypeSelectSchema: z.ZodType<Prisma.UserCountOutputTypeSelect> =
  z
    .object({
      sessions: z.boolean().optional(),
      accounts: z.boolean().optional(),
      threads: z.boolean().optional(),
    })
    .strict()

export const UserSelectSchema: z.ZodType<Prisma.UserSelect> = z
  .object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    email: z.boolean().optional(),
    emailVerified: z.boolean().optional(),
    image: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    sessions: z
      .union([z.boolean(), z.lazy(() => SessionFindManyArgsSchema)])
      .optional(),
    accounts: z
      .union([z.boolean(), z.lazy(() => AccountFindManyArgsSchema)])
      .optional(),
    threads: z
      .union([z.boolean(), z.lazy(() => ThreadFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => UserCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict()

// SESSION
//------------------------------------------------------

export const SessionIncludeSchema: z.ZodType<Prisma.SessionInclude> = z
  .object({
    user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
  })
  .strict()

export const SessionArgsSchema: z.ZodType<Prisma.SessionDefaultArgs> = z
  .object({
    select: z.lazy(() => SessionSelectSchema).optional(),
    include: z.lazy(() => SessionIncludeSchema).optional(),
  })
  .strict()

export const SessionSelectSchema: z.ZodType<Prisma.SessionSelect> = z
  .object({
    id: z.boolean().optional(),
    expiresAt: z.boolean().optional(),
    token: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    ipAddress: z.boolean().optional(),
    userAgent: z.boolean().optional(),
    userId: z.boolean().optional(),
    user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
  })
  .strict()

// ACCOUNT
//------------------------------------------------------

export const AccountIncludeSchema: z.ZodType<Prisma.AccountInclude> = z
  .object({
    user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
  })
  .strict()

export const AccountArgsSchema: z.ZodType<Prisma.AccountDefaultArgs> = z
  .object({
    select: z.lazy(() => AccountSelectSchema).optional(),
    include: z.lazy(() => AccountIncludeSchema).optional(),
  })
  .strict()

export const AccountSelectSchema: z.ZodType<Prisma.AccountSelect> = z
  .object({
    id: z.boolean().optional(),
    accountId: z.boolean().optional(),
    providerId: z.boolean().optional(),
    userId: z.boolean().optional(),
    accessToken: z.boolean().optional(),
    refreshToken: z.boolean().optional(),
    idToken: z.boolean().optional(),
    accessTokenExpiresAt: z.boolean().optional(),
    refreshTokenExpiresAt: z.boolean().optional(),
    scope: z.boolean().optional(),
    password: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    user: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
  })
  .strict()

// VERIFICATION
//------------------------------------------------------

export const VerificationSelectSchema: z.ZodType<Prisma.VerificationSelect> = z
  .object({
    id: z.boolean().optional(),
    identifier: z.boolean().optional(),
    value: z.boolean().optional(),
    expiresAt: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
  })
  .strict()

// CATEGORY
//------------------------------------------------------

export const CategoryIncludeSchema: z.ZodType<Prisma.CategoryInclude> = z
  .object({
    threads: z
      .union([z.boolean(), z.lazy(() => ThreadFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => CategoryCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict()

export const CategoryArgsSchema: z.ZodType<Prisma.CategoryDefaultArgs> = z
  .object({
    select: z.lazy(() => CategorySelectSchema).optional(),
    include: z.lazy(() => CategoryIncludeSchema).optional(),
  })
  .strict()

export const CategoryCountOutputTypeArgsSchema: z.ZodType<Prisma.CategoryCountOutputTypeDefaultArgs> =
  z
    .object({
      select: z.lazy(() => CategoryCountOutputTypeSelectSchema).nullish(),
    })
    .strict()

export const CategoryCountOutputTypeSelectSchema: z.ZodType<Prisma.CategoryCountOutputTypeSelect> =
  z
    .object({
      threads: z.boolean().optional(),
    })
    .strict()

export const CategorySelectSchema: z.ZodType<Prisma.CategorySelect> = z
  .object({
    id: z.boolean().optional(),
    name: z.boolean().optional(),
    emoji: z.boolean().optional(),
    threads: z
      .union([z.boolean(), z.lazy(() => ThreadFindManyArgsSchema)])
      .optional(),
    _count: z
      .union([z.boolean(), z.lazy(() => CategoryCountOutputTypeArgsSchema)])
      .optional(),
  })
  .strict()

// THREAD
//------------------------------------------------------

export const ThreadIncludeSchema: z.ZodType<Prisma.ThreadInclude> = z
  .object({
    author: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
    Category: z
      .union([z.boolean(), z.lazy(() => CategoryArgsSchema)])
      .optional(),
  })
  .strict()

export const ThreadArgsSchema: z.ZodType<Prisma.ThreadDefaultArgs> = z
  .object({
    select: z.lazy(() => ThreadSelectSchema).optional(),
    include: z.lazy(() => ThreadIncludeSchema).optional(),
  })
  .strict()

export const ThreadSelectSchema: z.ZodType<Prisma.ThreadSelect> = z
  .object({
    id: z.boolean().optional(),
    title: z.boolean().optional(),
    brief: z.boolean().optional(),
    content: z.boolean().optional(),
    isFlagged: z.boolean().optional(),
    flagReason: z.boolean().optional(),
    categoryId: z.boolean().optional(),
    userId: z.boolean().optional(),
    createdAt: z.boolean().optional(),
    updatedAt: z.boolean().optional(),
    author: z.union([z.boolean(), z.lazy(() => UserArgsSchema)]).optional(),
    Category: z
      .union([z.boolean(), z.lazy(() => CategoryArgsSchema)])
      .optional(),
  })
  .strict()

/////////////////////////////////////////
// INPUT TYPES
/////////////////////////////////////////

export const UserWhereInputSchema: z.ZodType<Prisma.UserWhereInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => UserWhereInputSchema),
        z.lazy(() => UserWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => UserWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => UserWhereInputSchema),
        z.lazy(() => UserWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    email: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    emailVerified: z
      .union([z.lazy(() => BoolFilterSchema), z.boolean()])
      .optional(),
    image: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
    accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
    threads: z.lazy(() => ThreadListRelationFilterSchema).optional(),
  })

export const UserOrderByWithRelationInputSchema: z.ZodType<Prisma.UserOrderByWithRelationInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    email: z.lazy(() => SortOrderSchema).optional(),
    emailVerified: z.lazy(() => SortOrderSchema).optional(),
    image: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    sessions: z
      .lazy(() => SessionOrderByRelationAggregateInputSchema)
      .optional(),
    accounts: z
      .lazy(() => AccountOrderByRelationAggregateInputSchema)
      .optional(),
    threads: z.lazy(() => ThreadOrderByRelationAggregateInputSchema).optional(),
  })

export const UserWhereUniqueInputSchema: z.ZodType<Prisma.UserWhereUniqueInput> =
  z
    .union([
      z.object({
        id: z.string(),
        email: z.string(),
      }),
      z.object({
        id: z.string(),
      }),
      z.object({
        email: z.string(),
      }),
    ])
    .and(
      z.strictObject({
        id: z.string().optional(),
        email: z.string().optional(),
        AND: z
          .union([
            z.lazy(() => UserWhereInputSchema),
            z.lazy(() => UserWhereInputSchema).array(),
          ])
          .optional(),
        OR: z
          .lazy(() => UserWhereInputSchema)
          .array()
          .optional(),
        NOT: z
          .union([
            z.lazy(() => UserWhereInputSchema),
            z.lazy(() => UserWhereInputSchema).array(),
          ])
          .optional(),
        name: z
          .union([z.lazy(() => StringFilterSchema), z.string()])
          .optional(),
        emailVerified: z
          .union([z.lazy(() => BoolFilterSchema), z.boolean()])
          .optional(),
        image: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        createdAt: z
          .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
          .optional(),
        updatedAt: z
          .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
          .optional(),
        sessions: z.lazy(() => SessionListRelationFilterSchema).optional(),
        accounts: z.lazy(() => AccountListRelationFilterSchema).optional(),
        threads: z.lazy(() => ThreadListRelationFilterSchema).optional(),
      }),
    )

export const UserOrderByWithAggregationInputSchema: z.ZodType<Prisma.UserOrderByWithAggregationInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    email: z.lazy(() => SortOrderSchema).optional(),
    emailVerified: z.lazy(() => SortOrderSchema).optional(),
    image: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    _count: z.lazy(() => UserCountOrderByAggregateInputSchema).optional(),
    _max: z.lazy(() => UserMaxOrderByAggregateInputSchema).optional(),
    _min: z.lazy(() => UserMinOrderByAggregateInputSchema).optional(),
  })

export const UserScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.UserScalarWhereWithAggregatesInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => UserScalarWhereWithAggregatesInputSchema),
        z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => UserScalarWhereWithAggregatesInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => UserScalarWhereWithAggregatesInputSchema),
        z.lazy(() => UserScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    name: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    email: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    emailVerified: z
      .union([z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean()])
      .optional(),
    image: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    createdAt: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterSchema),
        z.coerce.date(),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterSchema),
        z.coerce.date(),
      ])
      .optional(),
  })

export const SessionWhereInputSchema: z.ZodType<Prisma.SessionWhereInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => SessionWhereInputSchema),
        z.lazy(() => SessionWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => SessionWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => SessionWhereInputSchema),
        z.lazy(() => SessionWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    expiresAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    token: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    ipAddress: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    userAgent: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    user: z
      .union([
        z.lazy(() => UserScalarRelationFilterSchema),
        z.lazy(() => UserWhereInputSchema),
      ])
      .optional(),
  })

export const SessionOrderByWithRelationInputSchema: z.ZodType<Prisma.SessionOrderByWithRelationInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    expiresAt: z.lazy(() => SortOrderSchema).optional(),
    token: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    ipAddress: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    userAgent: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  })

export const SessionWhereUniqueInputSchema: z.ZodType<Prisma.SessionWhereUniqueInput> =
  z
    .union([
      z.object({
        id: z.string(),
        token: z.string(),
      }),
      z.object({
        id: z.string(),
      }),
      z.object({
        token: z.string(),
      }),
    ])
    .and(
      z.strictObject({
        id: z.string().optional(),
        token: z.string().optional(),
        AND: z
          .union([
            z.lazy(() => SessionWhereInputSchema),
            z.lazy(() => SessionWhereInputSchema).array(),
          ])
          .optional(),
        OR: z
          .lazy(() => SessionWhereInputSchema)
          .array()
          .optional(),
        NOT: z
          .union([
            z.lazy(() => SessionWhereInputSchema),
            z.lazy(() => SessionWhereInputSchema).array(),
          ])
          .optional(),
        expiresAt: z
          .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
          .optional(),
        createdAt: z
          .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
          .optional(),
        updatedAt: z
          .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
          .optional(),
        ipAddress: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        userAgent: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        userId: z
          .union([z.lazy(() => StringFilterSchema), z.string()])
          .optional(),
        user: z
          .union([
            z.lazy(() => UserScalarRelationFilterSchema),
            z.lazy(() => UserWhereInputSchema),
          ])
          .optional(),
      }),
    )

export const SessionOrderByWithAggregationInputSchema: z.ZodType<Prisma.SessionOrderByWithAggregationInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    expiresAt: z.lazy(() => SortOrderSchema).optional(),
    token: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    ipAddress: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    userAgent: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    _count: z.lazy(() => SessionCountOrderByAggregateInputSchema).optional(),
    _max: z.lazy(() => SessionMaxOrderByAggregateInputSchema).optional(),
    _min: z.lazy(() => SessionMinOrderByAggregateInputSchema).optional(),
  })

export const SessionScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.SessionScalarWhereWithAggregatesInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),
        z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => SessionScalarWhereWithAggregatesInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => SessionScalarWhereWithAggregatesInputSchema),
        z.lazy(() => SessionScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    expiresAt: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterSchema),
        z.coerce.date(),
      ])
      .optional(),
    token: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    createdAt: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterSchema),
        z.coerce.date(),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterSchema),
        z.coerce.date(),
      ])
      .optional(),
    ipAddress: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    userAgent: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    userId: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
  })

export const AccountWhereInputSchema: z.ZodType<Prisma.AccountWhereInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => AccountWhereInputSchema),
        z.lazy(() => AccountWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => AccountWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => AccountWhereInputSchema),
        z.lazy(() => AccountWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    accountId: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    providerId: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    accessToken: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    refreshToken: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    idToken: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    accessTokenExpiresAt: z
      .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
      .optional()
      .nullable(),
    refreshTokenExpiresAt: z
      .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
      .optional()
      .nullable(),
    scope: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    password: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    user: z
      .union([
        z.lazy(() => UserScalarRelationFilterSchema),
        z.lazy(() => UserWhereInputSchema),
      ])
      .optional(),
  })

export const AccountOrderByWithRelationInputSchema: z.ZodType<Prisma.AccountOrderByWithRelationInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    accountId: z.lazy(() => SortOrderSchema).optional(),
    providerId: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    accessToken: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    refreshToken: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    idToken: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    accessTokenExpiresAt: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    refreshTokenExpiresAt: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    scope: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    password: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    user: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
  })

export const AccountWhereUniqueInputSchema: z.ZodType<Prisma.AccountWhereUniqueInput> =
  z
    .object({
      id: z.string(),
    })
    .and(
      z.strictObject({
        id: z.string().optional(),
        AND: z
          .union([
            z.lazy(() => AccountWhereInputSchema),
            z.lazy(() => AccountWhereInputSchema).array(),
          ])
          .optional(),
        OR: z
          .lazy(() => AccountWhereInputSchema)
          .array()
          .optional(),
        NOT: z
          .union([
            z.lazy(() => AccountWhereInputSchema),
            z.lazy(() => AccountWhereInputSchema).array(),
          ])
          .optional(),
        accountId: z
          .union([z.lazy(() => StringFilterSchema), z.string()])
          .optional(),
        providerId: z
          .union([z.lazy(() => StringFilterSchema), z.string()])
          .optional(),
        userId: z
          .union([z.lazy(() => StringFilterSchema), z.string()])
          .optional(),
        accessToken: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        refreshToken: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        idToken: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        accessTokenExpiresAt: z
          .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
          .optional()
          .nullable(),
        refreshTokenExpiresAt: z
          .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
          .optional()
          .nullable(),
        scope: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        password: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        createdAt: z
          .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
          .optional(),
        updatedAt: z
          .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
          .optional(),
        user: z
          .union([
            z.lazy(() => UserScalarRelationFilterSchema),
            z.lazy(() => UserWhereInputSchema),
          ])
          .optional(),
      }),
    )

export const AccountOrderByWithAggregationInputSchema: z.ZodType<Prisma.AccountOrderByWithAggregationInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    accountId: z.lazy(() => SortOrderSchema).optional(),
    providerId: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    accessToken: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    refreshToken: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    idToken: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    accessTokenExpiresAt: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    refreshTokenExpiresAt: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    scope: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    password: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    _count: z.lazy(() => AccountCountOrderByAggregateInputSchema).optional(),
    _max: z.lazy(() => AccountMaxOrderByAggregateInputSchema).optional(),
    _min: z.lazy(() => AccountMinOrderByAggregateInputSchema).optional(),
  })

export const AccountScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.AccountScalarWhereWithAggregatesInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),
        z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => AccountScalarWhereWithAggregatesInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => AccountScalarWhereWithAggregatesInputSchema),
        z.lazy(() => AccountScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    accountId: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    providerId: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    userId: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    accessToken: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    refreshToken: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    idToken: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    accessTokenExpiresAt: z
      .union([
        z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),
        z.coerce.date(),
      ])
      .optional()
      .nullable(),
    refreshTokenExpiresAt: z
      .union([
        z.lazy(() => DateTimeNullableWithAggregatesFilterSchema),
        z.coerce.date(),
      ])
      .optional()
      .nullable(),
    scope: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    password: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    createdAt: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterSchema),
        z.coerce.date(),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterSchema),
        z.coerce.date(),
      ])
      .optional(),
  })

export const VerificationWhereInputSchema: z.ZodType<Prisma.VerificationWhereInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => VerificationWhereInputSchema),
        z.lazy(() => VerificationWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => VerificationWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => VerificationWhereInputSchema),
        z.lazy(() => VerificationWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    identifier: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    value: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    expiresAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
  })

export const VerificationOrderByWithRelationInputSchema: z.ZodType<Prisma.VerificationOrderByWithRelationInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    identifier: z.lazy(() => SortOrderSchema).optional(),
    value: z.lazy(() => SortOrderSchema).optional(),
    expiresAt: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
  })

export const VerificationWhereUniqueInputSchema: z.ZodType<Prisma.VerificationWhereUniqueInput> =
  z
    .object({
      id: z.string(),
    })
    .and(
      z.strictObject({
        id: z.string().optional(),
        AND: z
          .union([
            z.lazy(() => VerificationWhereInputSchema),
            z.lazy(() => VerificationWhereInputSchema).array(),
          ])
          .optional(),
        OR: z
          .lazy(() => VerificationWhereInputSchema)
          .array()
          .optional(),
        NOT: z
          .union([
            z.lazy(() => VerificationWhereInputSchema),
            z.lazy(() => VerificationWhereInputSchema).array(),
          ])
          .optional(),
        identifier: z
          .union([z.lazy(() => StringFilterSchema), z.string()])
          .optional(),
        value: z
          .union([z.lazy(() => StringFilterSchema), z.string()])
          .optional(),
        expiresAt: z
          .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
          .optional(),
        createdAt: z
          .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
          .optional(),
        updatedAt: z
          .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
          .optional(),
      }),
    )

export const VerificationOrderByWithAggregationInputSchema: z.ZodType<Prisma.VerificationOrderByWithAggregationInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    identifier: z.lazy(() => SortOrderSchema).optional(),
    value: z.lazy(() => SortOrderSchema).optional(),
    expiresAt: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    _count: z
      .lazy(() => VerificationCountOrderByAggregateInputSchema)
      .optional(),
    _max: z.lazy(() => VerificationMaxOrderByAggregateInputSchema).optional(),
    _min: z.lazy(() => VerificationMinOrderByAggregateInputSchema).optional(),
  })

export const VerificationScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.VerificationScalarWhereWithAggregatesInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => VerificationScalarWhereWithAggregatesInputSchema),
        z.lazy(() => VerificationScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => VerificationScalarWhereWithAggregatesInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => VerificationScalarWhereWithAggregatesInputSchema),
        z.lazy(() => VerificationScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    identifier: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    value: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    expiresAt: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterSchema),
        z.coerce.date(),
      ])
      .optional(),
    createdAt: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterSchema),
        z.coerce.date(),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterSchema),
        z.coerce.date(),
      ])
      .optional(),
  })

export const CategoryWhereInputSchema: z.ZodType<Prisma.CategoryWhereInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => CategoryWhereInputSchema),
        z.lazy(() => CategoryWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => CategoryWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => CategoryWhereInputSchema),
        z.lazy(() => CategoryWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    name: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    emoji: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    threads: z.lazy(() => ThreadListRelationFilterSchema).optional(),
  })

export const CategoryOrderByWithRelationInputSchema: z.ZodType<Prisma.CategoryOrderByWithRelationInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    emoji: z.lazy(() => SortOrderSchema).optional(),
    threads: z.lazy(() => ThreadOrderByRelationAggregateInputSchema).optional(),
  })

export const CategoryWhereUniqueInputSchema: z.ZodType<Prisma.CategoryWhereUniqueInput> =
  z
    .object({
      id: z.cuid(),
    })
    .and(
      z.strictObject({
        id: z.cuid().optional(),
        AND: z
          .union([
            z.lazy(() => CategoryWhereInputSchema),
            z.lazy(() => CategoryWhereInputSchema).array(),
          ])
          .optional(),
        OR: z
          .lazy(() => CategoryWhereInputSchema)
          .array()
          .optional(),
        NOT: z
          .union([
            z.lazy(() => CategoryWhereInputSchema),
            z.lazy(() => CategoryWhereInputSchema).array(),
          ])
          .optional(),
        name: z
          .union([z.lazy(() => StringFilterSchema), z.string()])
          .optional(),
        emoji: z
          .union([z.lazy(() => StringFilterSchema), z.string()])
          .optional(),
        threads: z.lazy(() => ThreadListRelationFilterSchema).optional(),
      }),
    )

export const CategoryOrderByWithAggregationInputSchema: z.ZodType<Prisma.CategoryOrderByWithAggregationInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    emoji: z.lazy(() => SortOrderSchema).optional(),
    _count: z.lazy(() => CategoryCountOrderByAggregateInputSchema).optional(),
    _max: z.lazy(() => CategoryMaxOrderByAggregateInputSchema).optional(),
    _min: z.lazy(() => CategoryMinOrderByAggregateInputSchema).optional(),
  })

export const CategoryScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.CategoryScalarWhereWithAggregatesInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => CategoryScalarWhereWithAggregatesInputSchema),
        z.lazy(() => CategoryScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => CategoryScalarWhereWithAggregatesInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => CategoryScalarWhereWithAggregatesInputSchema),
        z.lazy(() => CategoryScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    name: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    emoji: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
  })

export const ThreadWhereInputSchema: z.ZodType<Prisma.ThreadWhereInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => ThreadWhereInputSchema),
        z.lazy(() => ThreadWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => ThreadWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => ThreadWhereInputSchema),
        z.lazy(() => ThreadWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    title: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    brief: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    content: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    isFlagged: z
      .union([z.lazy(() => BoolFilterSchema), z.boolean()])
      .optional(),
    flagReason: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    categoryId: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    author: z
      .union([
        z.lazy(() => UserScalarRelationFilterSchema),
        z.lazy(() => UserWhereInputSchema),
      ])
      .optional(),
    Category: z
      .union([
        z.lazy(() => CategoryScalarRelationFilterSchema),
        z.lazy(() => CategoryWhereInputSchema),
      ])
      .optional(),
  })

export const ThreadOrderByWithRelationInputSchema: z.ZodType<Prisma.ThreadOrderByWithRelationInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    title: z.lazy(() => SortOrderSchema).optional(),
    brief: z.lazy(() => SortOrderSchema).optional(),
    content: z.lazy(() => SortOrderSchema).optional(),
    isFlagged: z.lazy(() => SortOrderSchema).optional(),
    flagReason: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    categoryId: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    author: z.lazy(() => UserOrderByWithRelationInputSchema).optional(),
    Category: z.lazy(() => CategoryOrderByWithRelationInputSchema).optional(),
  })

export const ThreadWhereUniqueInputSchema: z.ZodType<Prisma.ThreadWhereUniqueInput> =
  z
    .object({
      id: z.cuid(),
    })
    .and(
      z.strictObject({
        id: z.cuid().optional(),
        AND: z
          .union([
            z.lazy(() => ThreadWhereInputSchema),
            z.lazy(() => ThreadWhereInputSchema).array(),
          ])
          .optional(),
        OR: z
          .lazy(() => ThreadWhereInputSchema)
          .array()
          .optional(),
        NOT: z
          .union([
            z.lazy(() => ThreadWhereInputSchema),
            z.lazy(() => ThreadWhereInputSchema).array(),
          ])
          .optional(),
        title: z
          .union([z.lazy(() => StringFilterSchema), z.string()])
          .optional(),
        brief: z
          .union([z.lazy(() => StringFilterSchema), z.string()])
          .optional(),
        content: z
          .union([z.lazy(() => StringFilterSchema), z.string()])
          .optional(),
        isFlagged: z
          .union([z.lazy(() => BoolFilterSchema), z.boolean()])
          .optional(),
        flagReason: z
          .union([z.lazy(() => StringNullableFilterSchema), z.string()])
          .optional()
          .nullable(),
        categoryId: z
          .union([z.lazy(() => StringFilterSchema), z.string()])
          .optional(),
        userId: z
          .union([z.lazy(() => StringFilterSchema), z.string()])
          .optional(),
        createdAt: z
          .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
          .optional(),
        updatedAt: z
          .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
          .optional(),
        author: z
          .union([
            z.lazy(() => UserScalarRelationFilterSchema),
            z.lazy(() => UserWhereInputSchema),
          ])
          .optional(),
        Category: z
          .union([
            z.lazy(() => CategoryScalarRelationFilterSchema),
            z.lazy(() => CategoryWhereInputSchema),
          ])
          .optional(),
      }),
    )

export const ThreadOrderByWithAggregationInputSchema: z.ZodType<Prisma.ThreadOrderByWithAggregationInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    title: z.lazy(() => SortOrderSchema).optional(),
    brief: z.lazy(() => SortOrderSchema).optional(),
    content: z.lazy(() => SortOrderSchema).optional(),
    isFlagged: z.lazy(() => SortOrderSchema).optional(),
    flagReason: z
      .union([
        z.lazy(() => SortOrderSchema),
        z.lazy(() => SortOrderInputSchema),
      ])
      .optional(),
    categoryId: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    _count: z.lazy(() => ThreadCountOrderByAggregateInputSchema).optional(),
    _max: z.lazy(() => ThreadMaxOrderByAggregateInputSchema).optional(),
    _min: z.lazy(() => ThreadMinOrderByAggregateInputSchema).optional(),
  })

export const ThreadScalarWhereWithAggregatesInputSchema: z.ZodType<Prisma.ThreadScalarWhereWithAggregatesInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => ThreadScalarWhereWithAggregatesInputSchema),
        z.lazy(() => ThreadScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => ThreadScalarWhereWithAggregatesInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => ThreadScalarWhereWithAggregatesInputSchema),
        z.lazy(() => ThreadScalarWhereWithAggregatesInputSchema).array(),
      ])
      .optional(),
    id: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    title: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    brief: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    content: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    isFlagged: z
      .union([z.lazy(() => BoolWithAggregatesFilterSchema), z.boolean()])
      .optional(),
    flagReason: z
      .union([
        z.lazy(() => StringNullableWithAggregatesFilterSchema),
        z.string(),
      ])
      .optional()
      .nullable(),
    categoryId: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    userId: z
      .union([z.lazy(() => StringWithAggregatesFilterSchema), z.string()])
      .optional(),
    createdAt: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterSchema),
        z.coerce.date(),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.lazy(() => DateTimeWithAggregatesFilterSchema),
        z.coerce.date(),
      ])
      .optional(),
  })

export const UserCreateInputSchema: z.ZodType<Prisma.UserCreateInput> =
  z.strictObject({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    emailVerified: z.boolean().optional(),
    image: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    sessions: z
      .lazy(() => SessionCreateNestedManyWithoutUserInputSchema)
      .optional(),
    accounts: z
      .lazy(() => AccountCreateNestedManyWithoutUserInputSchema)
      .optional(),
    threads: z
      .lazy(() => ThreadCreateNestedManyWithoutAuthorInputSchema)
      .optional(),
  })

export const UserUncheckedCreateInputSchema: z.ZodType<Prisma.UserUncheckedCreateInput> =
  z.strictObject({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    emailVerified: z.boolean().optional(),
    image: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    sessions: z
      .lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema)
      .optional(),
    accounts: z
      .lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema)
      .optional(),
    threads: z
      .lazy(() => ThreadUncheckedCreateNestedManyWithoutAuthorInputSchema)
      .optional(),
  })

export const UserUpdateInputSchema: z.ZodType<Prisma.UserUpdateInput> =
  z.strictObject({
    id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    email: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    emailVerified: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    image: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    sessions: z
      .lazy(() => SessionUpdateManyWithoutUserNestedInputSchema)
      .optional(),
    accounts: z
      .lazy(() => AccountUpdateManyWithoutUserNestedInputSchema)
      .optional(),
    threads: z
      .lazy(() => ThreadUpdateManyWithoutAuthorNestedInputSchema)
      .optional(),
  })

export const UserUncheckedUpdateInputSchema: z.ZodType<Prisma.UserUncheckedUpdateInput> =
  z.strictObject({
    id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    email: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    emailVerified: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    image: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    sessions: z
      .lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema)
      .optional(),
    accounts: z
      .lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema)
      .optional(),
    threads: z
      .lazy(() => ThreadUncheckedUpdateManyWithoutAuthorNestedInputSchema)
      .optional(),
  })

export const UserCreateManyInputSchema: z.ZodType<Prisma.UserCreateManyInput> =
  z.strictObject({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    emailVerified: z.boolean().optional(),
    image: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  })

export const UserUpdateManyMutationInputSchema: z.ZodType<Prisma.UserUpdateManyMutationInput> =
  z.strictObject({
    id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    email: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    emailVerified: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    image: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  })

export const UserUncheckedUpdateManyInputSchema: z.ZodType<Prisma.UserUncheckedUpdateManyInput> =
  z.strictObject({
    id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    email: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    emailVerified: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    image: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  })

export const SessionCreateInputSchema: z.ZodType<Prisma.SessionCreateInput> =
  z.strictObject({
    id: z.string(),
    expiresAt: z.coerce.date(),
    token: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    ipAddress: z.string().optional().nullable(),
    userAgent: z.string().optional().nullable(),
    user: z.lazy(() => UserCreateNestedOneWithoutSessionsInputSchema),
  })

export const SessionUncheckedCreateInputSchema: z.ZodType<Prisma.SessionUncheckedCreateInput> =
  z.strictObject({
    id: z.string(),
    expiresAt: z.coerce.date(),
    token: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    ipAddress: z.string().optional().nullable(),
    userAgent: z.string().optional().nullable(),
    userId: z.string(),
  })

export const SessionUpdateInputSchema: z.ZodType<Prisma.SessionUpdateInput> =
  z.strictObject({
    id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    expiresAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    token: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    ipAddress: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    userAgent: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    user: z
      .lazy(() => UserUpdateOneRequiredWithoutSessionsNestedInputSchema)
      .optional(),
  })

export const SessionUncheckedUpdateInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateInput> =
  z.strictObject({
    id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    expiresAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    token: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    ipAddress: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    userAgent: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    userId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
  })

export const SessionCreateManyInputSchema: z.ZodType<Prisma.SessionCreateManyInput> =
  z.strictObject({
    id: z.string(),
    expiresAt: z.coerce.date(),
    token: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    ipAddress: z.string().optional().nullable(),
    userAgent: z.string().optional().nullable(),
    userId: z.string(),
  })

export const SessionUpdateManyMutationInputSchema: z.ZodType<Prisma.SessionUpdateManyMutationInput> =
  z.strictObject({
    id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    expiresAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    token: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    ipAddress: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    userAgent: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
  })

export const SessionUncheckedUpdateManyInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyInput> =
  z.strictObject({
    id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    expiresAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    token: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    ipAddress: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    userAgent: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    userId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
  })

export const AccountCreateInputSchema: z.ZodType<Prisma.AccountCreateInput> =
  z.strictObject({
    id: z.string(),
    accountId: z.string(),
    providerId: z.string(),
    accessToken: z.string().optional().nullable(),
    refreshToken: z.string().optional().nullable(),
    idToken: z.string().optional().nullable(),
    accessTokenExpiresAt: z.coerce.date().optional().nullable(),
    refreshTokenExpiresAt: z.coerce.date().optional().nullable(),
    scope: z.string().optional().nullable(),
    password: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    user: z.lazy(() => UserCreateNestedOneWithoutAccountsInputSchema),
  })

export const AccountUncheckedCreateInputSchema: z.ZodType<Prisma.AccountUncheckedCreateInput> =
  z.strictObject({
    id: z.string(),
    accountId: z.string(),
    providerId: z.string(),
    userId: z.string(),
    accessToken: z.string().optional().nullable(),
    refreshToken: z.string().optional().nullable(),
    idToken: z.string().optional().nullable(),
    accessTokenExpiresAt: z.coerce.date().optional().nullable(),
    refreshTokenExpiresAt: z.coerce.date().optional().nullable(),
    scope: z.string().optional().nullable(),
    password: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  })

export const AccountUpdateInputSchema: z.ZodType<Prisma.AccountUpdateInput> =
  z.strictObject({
    id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    accountId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    providerId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    accessToken: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    refreshToken: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    idToken: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    accessTokenExpiresAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    refreshTokenExpiresAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    scope: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    password: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    user: z
      .lazy(() => UserUpdateOneRequiredWithoutAccountsNestedInputSchema)
      .optional(),
  })

export const AccountUncheckedUpdateInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateInput> =
  z.strictObject({
    id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    accountId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    providerId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    userId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    accessToken: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    refreshToken: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    idToken: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    accessTokenExpiresAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    refreshTokenExpiresAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    scope: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    password: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  })

export const AccountCreateManyInputSchema: z.ZodType<Prisma.AccountCreateManyInput> =
  z.strictObject({
    id: z.string(),
    accountId: z.string(),
    providerId: z.string(),
    userId: z.string(),
    accessToken: z.string().optional().nullable(),
    refreshToken: z.string().optional().nullable(),
    idToken: z.string().optional().nullable(),
    accessTokenExpiresAt: z.coerce.date().optional().nullable(),
    refreshTokenExpiresAt: z.coerce.date().optional().nullable(),
    scope: z.string().optional().nullable(),
    password: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  })

export const AccountUpdateManyMutationInputSchema: z.ZodType<Prisma.AccountUpdateManyMutationInput> =
  z.strictObject({
    id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    accountId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    providerId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    accessToken: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    refreshToken: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    idToken: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    accessTokenExpiresAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    refreshTokenExpiresAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    scope: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    password: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  })

export const AccountUncheckedUpdateManyInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyInput> =
  z.strictObject({
    id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    accountId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    providerId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    userId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    accessToken: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    refreshToken: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    idToken: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    accessTokenExpiresAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    refreshTokenExpiresAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    scope: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    password: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  })

export const VerificationCreateInputSchema: z.ZodType<Prisma.VerificationCreateInput> =
  z.strictObject({
    id: z.string(),
    identifier: z.string(),
    value: z.string(),
    expiresAt: z.coerce.date(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  })

export const VerificationUncheckedCreateInputSchema: z.ZodType<Prisma.VerificationUncheckedCreateInput> =
  z.strictObject({
    id: z.string(),
    identifier: z.string(),
    value: z.string(),
    expiresAt: z.coerce.date(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  })

export const VerificationUpdateInputSchema: z.ZodType<Prisma.VerificationUpdateInput> =
  z.strictObject({
    id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    identifier: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    value: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    expiresAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  })

export const VerificationUncheckedUpdateInputSchema: z.ZodType<Prisma.VerificationUncheckedUpdateInput> =
  z.strictObject({
    id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    identifier: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    value: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    expiresAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  })

export const VerificationCreateManyInputSchema: z.ZodType<Prisma.VerificationCreateManyInput> =
  z.strictObject({
    id: z.string(),
    identifier: z.string(),
    value: z.string(),
    expiresAt: z.coerce.date(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  })

export const VerificationUpdateManyMutationInputSchema: z.ZodType<Prisma.VerificationUpdateManyMutationInput> =
  z.strictObject({
    id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    identifier: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    value: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    expiresAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  })

export const VerificationUncheckedUpdateManyInputSchema: z.ZodType<Prisma.VerificationUncheckedUpdateManyInput> =
  z.strictObject({
    id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    identifier: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    value: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    expiresAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  })

export const CategoryCreateInputSchema: z.ZodType<Prisma.CategoryCreateInput> =
  z.strictObject({
    id: z.cuid().optional(),
    name: z.string(),
    emoji: z.string(),
    threads: z
      .lazy(() => ThreadCreateNestedManyWithoutCategoryInputSchema)
      .optional(),
  })

export const CategoryUncheckedCreateInputSchema: z.ZodType<Prisma.CategoryUncheckedCreateInput> =
  z.strictObject({
    id: z.cuid().optional(),
    name: z.string(),
    emoji: z.string(),
    threads: z
      .lazy(() => ThreadUncheckedCreateNestedManyWithoutCategoryInputSchema)
      .optional(),
  })

export const CategoryUpdateInputSchema: z.ZodType<Prisma.CategoryUpdateInput> =
  z.strictObject({
    id: z
      .union([z.cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    emoji: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    threads: z
      .lazy(() => ThreadUpdateManyWithoutCategoryNestedInputSchema)
      .optional(),
  })

export const CategoryUncheckedUpdateInputSchema: z.ZodType<Prisma.CategoryUncheckedUpdateInput> =
  z.strictObject({
    id: z
      .union([z.cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    emoji: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    threads: z
      .lazy(() => ThreadUncheckedUpdateManyWithoutCategoryNestedInputSchema)
      .optional(),
  })

export const CategoryCreateManyInputSchema: z.ZodType<Prisma.CategoryCreateManyInput> =
  z.strictObject({
    id: z.cuid().optional(),
    name: z.string(),
    emoji: z.string(),
  })

export const CategoryUpdateManyMutationInputSchema: z.ZodType<Prisma.CategoryUpdateManyMutationInput> =
  z.strictObject({
    id: z
      .union([z.cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    emoji: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
  })

export const CategoryUncheckedUpdateManyInputSchema: z.ZodType<Prisma.CategoryUncheckedUpdateManyInput> =
  z.strictObject({
    id: z
      .union([z.cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    emoji: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
  })

export const ThreadCreateInputSchema: z.ZodType<Prisma.ThreadCreateInput> =
  z.strictObject({
    id: z.cuid().optional(),
    title: z.string(),
    brief: z.string(),
    content: z.string(),
    isFlagged: z.boolean().optional(),
    flagReason: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    author: z.lazy(() => UserCreateNestedOneWithoutThreadsInputSchema),
    Category: z.lazy(() => CategoryCreateNestedOneWithoutThreadsInputSchema),
  })

export const ThreadUncheckedCreateInputSchema: z.ZodType<Prisma.ThreadUncheckedCreateInput> =
  z.strictObject({
    id: z.cuid().optional(),
    title: z.string(),
    brief: z.string(),
    content: z.string(),
    isFlagged: z.boolean().optional(),
    flagReason: z.string().optional().nullable(),
    categoryId: z.string(),
    userId: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  })

export const ThreadUpdateInputSchema: z.ZodType<Prisma.ThreadUpdateInput> =
  z.strictObject({
    id: z
      .union([z.cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    title: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    brief: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    content: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    isFlagged: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    flagReason: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    author: z
      .lazy(() => UserUpdateOneRequiredWithoutThreadsNestedInputSchema)
      .optional(),
    Category: z
      .lazy(() => CategoryUpdateOneRequiredWithoutThreadsNestedInputSchema)
      .optional(),
  })

export const ThreadUncheckedUpdateInputSchema: z.ZodType<Prisma.ThreadUncheckedUpdateInput> =
  z.strictObject({
    id: z
      .union([z.cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    title: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    brief: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    content: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    isFlagged: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    flagReason: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    categoryId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    userId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  })

export const ThreadCreateManyInputSchema: z.ZodType<Prisma.ThreadCreateManyInput> =
  z.strictObject({
    id: z.cuid().optional(),
    title: z.string(),
    brief: z.string(),
    content: z.string(),
    isFlagged: z.boolean().optional(),
    flagReason: z.string().optional().nullable(),
    categoryId: z.string(),
    userId: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  })

export const ThreadUpdateManyMutationInputSchema: z.ZodType<Prisma.ThreadUpdateManyMutationInput> =
  z.strictObject({
    id: z
      .union([z.cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    title: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    brief: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    content: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    isFlagged: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    flagReason: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  })

export const ThreadUncheckedUpdateManyInputSchema: z.ZodType<Prisma.ThreadUncheckedUpdateManyInput> =
  z.strictObject({
    id: z
      .union([z.cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    title: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    brief: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    content: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    isFlagged: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    flagReason: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    categoryId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    userId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  })

export const StringFilterSchema: z.ZodType<Prisma.StringFilter> =
  z.strictObject({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    mode: z.lazy(() => QueryModeSchema).optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringFilterSchema)])
      .optional(),
  })

export const BoolFilterSchema: z.ZodType<Prisma.BoolFilter> = z.strictObject({
  equals: z.boolean().optional(),
  not: z.union([z.boolean(), z.lazy(() => NestedBoolFilterSchema)]).optional(),
})

export const StringNullableFilterSchema: z.ZodType<Prisma.StringNullableFilter> =
  z.strictObject({
    equals: z.string().optional().nullable(),
    in: z.string().array().optional().nullable(),
    notIn: z.string().array().optional().nullable(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    mode: z.lazy(() => QueryModeSchema).optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)])
      .optional()
      .nullable(),
  })

export const DateTimeFilterSchema: z.ZodType<Prisma.DateTimeFilter> =
  z.strictObject({
    equals: z.coerce.date().optional(),
    in: z.coerce.date().array().optional(),
    notIn: z.coerce.date().array().optional(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    not: z
      .union([z.coerce.date(), z.lazy(() => NestedDateTimeFilterSchema)])
      .optional(),
  })

export const SessionListRelationFilterSchema: z.ZodType<Prisma.SessionListRelationFilter> =
  z.strictObject({
    every: z.lazy(() => SessionWhereInputSchema).optional(),
    some: z.lazy(() => SessionWhereInputSchema).optional(),
    none: z.lazy(() => SessionWhereInputSchema).optional(),
  })

export const AccountListRelationFilterSchema: z.ZodType<Prisma.AccountListRelationFilter> =
  z.strictObject({
    every: z.lazy(() => AccountWhereInputSchema).optional(),
    some: z.lazy(() => AccountWhereInputSchema).optional(),
    none: z.lazy(() => AccountWhereInputSchema).optional(),
  })

export const ThreadListRelationFilterSchema: z.ZodType<Prisma.ThreadListRelationFilter> =
  z.strictObject({
    every: z.lazy(() => ThreadWhereInputSchema).optional(),
    some: z.lazy(() => ThreadWhereInputSchema).optional(),
    none: z.lazy(() => ThreadWhereInputSchema).optional(),
  })

export const SortOrderInputSchema: z.ZodType<Prisma.SortOrderInput> =
  z.strictObject({
    sort: z.lazy(() => SortOrderSchema),
    nulls: z.lazy(() => NullsOrderSchema).optional(),
  })

export const SessionOrderByRelationAggregateInputSchema: z.ZodType<Prisma.SessionOrderByRelationAggregateInput> =
  z.strictObject({
    _count: z.lazy(() => SortOrderSchema).optional(),
  })

export const AccountOrderByRelationAggregateInputSchema: z.ZodType<Prisma.AccountOrderByRelationAggregateInput> =
  z.strictObject({
    _count: z.lazy(() => SortOrderSchema).optional(),
  })

export const ThreadOrderByRelationAggregateInputSchema: z.ZodType<Prisma.ThreadOrderByRelationAggregateInput> =
  z.strictObject({
    _count: z.lazy(() => SortOrderSchema).optional(),
  })

export const UserCountOrderByAggregateInputSchema: z.ZodType<Prisma.UserCountOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    email: z.lazy(() => SortOrderSchema).optional(),
    emailVerified: z.lazy(() => SortOrderSchema).optional(),
    image: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
  })

export const UserMaxOrderByAggregateInputSchema: z.ZodType<Prisma.UserMaxOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    email: z.lazy(() => SortOrderSchema).optional(),
    emailVerified: z.lazy(() => SortOrderSchema).optional(),
    image: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
  })

export const UserMinOrderByAggregateInputSchema: z.ZodType<Prisma.UserMinOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    email: z.lazy(() => SortOrderSchema).optional(),
    emailVerified: z.lazy(() => SortOrderSchema).optional(),
    image: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
  })

export const StringWithAggregatesFilterSchema: z.ZodType<Prisma.StringWithAggregatesFilter> =
  z.strictObject({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    mode: z.lazy(() => QueryModeSchema).optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringWithAggregatesFilterSchema)])
      .optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedStringFilterSchema).optional(),
    _max: z.lazy(() => NestedStringFilterSchema).optional(),
  })

export const BoolWithAggregatesFilterSchema: z.ZodType<Prisma.BoolWithAggregatesFilter> =
  z.strictObject({
    equals: z.boolean().optional(),
    not: z
      .union([z.boolean(), z.lazy(() => NestedBoolWithAggregatesFilterSchema)])
      .optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedBoolFilterSchema).optional(),
    _max: z.lazy(() => NestedBoolFilterSchema).optional(),
  })

export const StringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.StringNullableWithAggregatesFilter> =
  z.strictObject({
    equals: z.string().optional().nullable(),
    in: z.string().array().optional().nullable(),
    notIn: z.string().array().optional().nullable(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    mode: z.lazy(() => QueryModeSchema).optional(),
    not: z
      .union([
        z.string(),
        z.lazy(() => NestedStringNullableWithAggregatesFilterSchema),
      ])
      .optional()
      .nullable(),
    _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
    _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  })

export const DateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeWithAggregatesFilter> =
  z.strictObject({
    equals: z.coerce.date().optional(),
    in: z.coerce.date().array().optional(),
    notIn: z.coerce.date().array().optional(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    not: z
      .union([
        z.coerce.date(),
        z.lazy(() => NestedDateTimeWithAggregatesFilterSchema),
      ])
      .optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
    _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  })

export const UserScalarRelationFilterSchema: z.ZodType<Prisma.UserScalarRelationFilter> =
  z.strictObject({
    is: z.lazy(() => UserWhereInputSchema).optional(),
    isNot: z.lazy(() => UserWhereInputSchema).optional(),
  })

export const SessionCountOrderByAggregateInputSchema: z.ZodType<Prisma.SessionCountOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    expiresAt: z.lazy(() => SortOrderSchema).optional(),
    token: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    ipAddress: z.lazy(() => SortOrderSchema).optional(),
    userAgent: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
  })

export const SessionMaxOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMaxOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    expiresAt: z.lazy(() => SortOrderSchema).optional(),
    token: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    ipAddress: z.lazy(() => SortOrderSchema).optional(),
    userAgent: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
  })

export const SessionMinOrderByAggregateInputSchema: z.ZodType<Prisma.SessionMinOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    expiresAt: z.lazy(() => SortOrderSchema).optional(),
    token: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
    ipAddress: z.lazy(() => SortOrderSchema).optional(),
    userAgent: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
  })

export const DateTimeNullableFilterSchema: z.ZodType<Prisma.DateTimeNullableFilter> =
  z.strictObject({
    equals: z.coerce.date().optional().nullable(),
    in: z.coerce.date().array().optional().nullable(),
    notIn: z.coerce.date().array().optional().nullable(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    not: z
      .union([
        z.coerce.date(),
        z.lazy(() => NestedDateTimeNullableFilterSchema),
      ])
      .optional()
      .nullable(),
  })

export const AccountCountOrderByAggregateInputSchema: z.ZodType<Prisma.AccountCountOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    accountId: z.lazy(() => SortOrderSchema).optional(),
    providerId: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    accessToken: z.lazy(() => SortOrderSchema).optional(),
    refreshToken: z.lazy(() => SortOrderSchema).optional(),
    idToken: z.lazy(() => SortOrderSchema).optional(),
    accessTokenExpiresAt: z.lazy(() => SortOrderSchema).optional(),
    refreshTokenExpiresAt: z.lazy(() => SortOrderSchema).optional(),
    scope: z.lazy(() => SortOrderSchema).optional(),
    password: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
  })

export const AccountMaxOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMaxOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    accountId: z.lazy(() => SortOrderSchema).optional(),
    providerId: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    accessToken: z.lazy(() => SortOrderSchema).optional(),
    refreshToken: z.lazy(() => SortOrderSchema).optional(),
    idToken: z.lazy(() => SortOrderSchema).optional(),
    accessTokenExpiresAt: z.lazy(() => SortOrderSchema).optional(),
    refreshTokenExpiresAt: z.lazy(() => SortOrderSchema).optional(),
    scope: z.lazy(() => SortOrderSchema).optional(),
    password: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
  })

export const AccountMinOrderByAggregateInputSchema: z.ZodType<Prisma.AccountMinOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    accountId: z.lazy(() => SortOrderSchema).optional(),
    providerId: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    accessToken: z.lazy(() => SortOrderSchema).optional(),
    refreshToken: z.lazy(() => SortOrderSchema).optional(),
    idToken: z.lazy(() => SortOrderSchema).optional(),
    accessTokenExpiresAt: z.lazy(() => SortOrderSchema).optional(),
    refreshTokenExpiresAt: z.lazy(() => SortOrderSchema).optional(),
    scope: z.lazy(() => SortOrderSchema).optional(),
    password: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
  })

export const DateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.DateTimeNullableWithAggregatesFilter> =
  z.strictObject({
    equals: z.coerce.date().optional().nullable(),
    in: z.coerce.date().array().optional().nullable(),
    notIn: z.coerce.date().array().optional().nullable(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    not: z
      .union([
        z.coerce.date(),
        z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema),
      ])
      .optional()
      .nullable(),
    _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
    _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  })

export const VerificationCountOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationCountOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    identifier: z.lazy(() => SortOrderSchema).optional(),
    value: z.lazy(() => SortOrderSchema).optional(),
    expiresAt: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
  })

export const VerificationMaxOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationMaxOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    identifier: z.lazy(() => SortOrderSchema).optional(),
    value: z.lazy(() => SortOrderSchema).optional(),
    expiresAt: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
  })

export const VerificationMinOrderByAggregateInputSchema: z.ZodType<Prisma.VerificationMinOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    identifier: z.lazy(() => SortOrderSchema).optional(),
    value: z.lazy(() => SortOrderSchema).optional(),
    expiresAt: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
  })

export const CategoryCountOrderByAggregateInputSchema: z.ZodType<Prisma.CategoryCountOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    emoji: z.lazy(() => SortOrderSchema).optional(),
  })

export const CategoryMaxOrderByAggregateInputSchema: z.ZodType<Prisma.CategoryMaxOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    emoji: z.lazy(() => SortOrderSchema).optional(),
  })

export const CategoryMinOrderByAggregateInputSchema: z.ZodType<Prisma.CategoryMinOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    name: z.lazy(() => SortOrderSchema).optional(),
    emoji: z.lazy(() => SortOrderSchema).optional(),
  })

export const CategoryScalarRelationFilterSchema: z.ZodType<Prisma.CategoryScalarRelationFilter> =
  z.strictObject({
    is: z.lazy(() => CategoryWhereInputSchema).optional(),
    isNot: z.lazy(() => CategoryWhereInputSchema).optional(),
  })

export const ThreadCountOrderByAggregateInputSchema: z.ZodType<Prisma.ThreadCountOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    title: z.lazy(() => SortOrderSchema).optional(),
    brief: z.lazy(() => SortOrderSchema).optional(),
    content: z.lazy(() => SortOrderSchema).optional(),
    isFlagged: z.lazy(() => SortOrderSchema).optional(),
    flagReason: z.lazy(() => SortOrderSchema).optional(),
    categoryId: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
  })

export const ThreadMaxOrderByAggregateInputSchema: z.ZodType<Prisma.ThreadMaxOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    title: z.lazy(() => SortOrderSchema).optional(),
    brief: z.lazy(() => SortOrderSchema).optional(),
    content: z.lazy(() => SortOrderSchema).optional(),
    isFlagged: z.lazy(() => SortOrderSchema).optional(),
    flagReason: z.lazy(() => SortOrderSchema).optional(),
    categoryId: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
  })

export const ThreadMinOrderByAggregateInputSchema: z.ZodType<Prisma.ThreadMinOrderByAggregateInput> =
  z.strictObject({
    id: z.lazy(() => SortOrderSchema).optional(),
    title: z.lazy(() => SortOrderSchema).optional(),
    brief: z.lazy(() => SortOrderSchema).optional(),
    content: z.lazy(() => SortOrderSchema).optional(),
    isFlagged: z.lazy(() => SortOrderSchema).optional(),
    flagReason: z.lazy(() => SortOrderSchema).optional(),
    categoryId: z.lazy(() => SortOrderSchema).optional(),
    userId: z.lazy(() => SortOrderSchema).optional(),
    createdAt: z.lazy(() => SortOrderSchema).optional(),
    updatedAt: z.lazy(() => SortOrderSchema).optional(),
  })

export const SessionCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateNestedManyWithoutUserInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => SessionCreateWithoutUserInputSchema),
        z.lazy(() => SessionCreateWithoutUserInputSchema).array(),
        z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),
        z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),
        z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => SessionCreateManyUserInputEnvelopeSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => SessionWhereUniqueInputSchema),
        z.lazy(() => SessionWhereUniqueInputSchema).array(),
      ])
      .optional(),
  })

export const AccountCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateNestedManyWithoutUserInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => AccountCreateWithoutUserInputSchema),
        z.lazy(() => AccountCreateWithoutUserInputSchema).array(),
        z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),
        z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),
        z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => AccountCreateManyUserInputEnvelopeSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => AccountWhereUniqueInputSchema),
        z.lazy(() => AccountWhereUniqueInputSchema).array(),
      ])
      .optional(),
  })

export const ThreadCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.ThreadCreateNestedManyWithoutAuthorInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => ThreadCreateWithoutAuthorInputSchema),
        z.lazy(() => ThreadCreateWithoutAuthorInputSchema).array(),
        z.lazy(() => ThreadUncheckedCreateWithoutAuthorInputSchema),
        z.lazy(() => ThreadUncheckedCreateWithoutAuthorInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => ThreadCreateOrConnectWithoutAuthorInputSchema),
        z.lazy(() => ThreadCreateOrConnectWithoutAuthorInputSchema).array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => ThreadCreateManyAuthorInputEnvelopeSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => ThreadWhereUniqueInputSchema),
        z.lazy(() => ThreadWhereUniqueInputSchema).array(),
      ])
      .optional(),
  })

export const SessionUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateNestedManyWithoutUserInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => SessionCreateWithoutUserInputSchema),
        z.lazy(() => SessionCreateWithoutUserInputSchema).array(),
        z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),
        z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),
        z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => SessionCreateManyUserInputEnvelopeSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => SessionWhereUniqueInputSchema),
        z.lazy(() => SessionWhereUniqueInputSchema).array(),
      ])
      .optional(),
  })

export const AccountUncheckedCreateNestedManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateNestedManyWithoutUserInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => AccountCreateWithoutUserInputSchema),
        z.lazy(() => AccountCreateWithoutUserInputSchema).array(),
        z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),
        z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),
        z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => AccountCreateManyUserInputEnvelopeSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => AccountWhereUniqueInputSchema),
        z.lazy(() => AccountWhereUniqueInputSchema).array(),
      ])
      .optional(),
  })

export const ThreadUncheckedCreateNestedManyWithoutAuthorInputSchema: z.ZodType<Prisma.ThreadUncheckedCreateNestedManyWithoutAuthorInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => ThreadCreateWithoutAuthorInputSchema),
        z.lazy(() => ThreadCreateWithoutAuthorInputSchema).array(),
        z.lazy(() => ThreadUncheckedCreateWithoutAuthorInputSchema),
        z.lazy(() => ThreadUncheckedCreateWithoutAuthorInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => ThreadCreateOrConnectWithoutAuthorInputSchema),
        z.lazy(() => ThreadCreateOrConnectWithoutAuthorInputSchema).array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => ThreadCreateManyAuthorInputEnvelopeSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => ThreadWhereUniqueInputSchema),
        z.lazy(() => ThreadWhereUniqueInputSchema).array(),
      ])
      .optional(),
  })

export const StringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.StringFieldUpdateOperationsInput> =
  z.strictObject({
    set: z.string().optional(),
  })

export const BoolFieldUpdateOperationsInputSchema: z.ZodType<Prisma.BoolFieldUpdateOperationsInput> =
  z.strictObject({
    set: z.boolean().optional(),
  })

export const NullableStringFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableStringFieldUpdateOperationsInput> =
  z.strictObject({
    set: z.string().optional().nullable(),
  })

export const DateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.DateTimeFieldUpdateOperationsInput> =
  z.strictObject({
    set: z.coerce.date().optional(),
  })

export const SessionUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUpdateManyWithoutUserNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => SessionCreateWithoutUserInputSchema),
        z.lazy(() => SessionCreateWithoutUserInputSchema).array(),
        z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),
        z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),
        z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),
        z
          .lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => SessionCreateManyUserInputEnvelopeSchema)
      .optional(),
    set: z
      .union([
        z.lazy(() => SessionWhereUniqueInputSchema),
        z.lazy(() => SessionWhereUniqueInputSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => SessionWhereUniqueInputSchema),
        z.lazy(() => SessionWhereUniqueInputSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => SessionWhereUniqueInputSchema),
        z.lazy(() => SessionWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => SessionWhereUniqueInputSchema),
        z.lazy(() => SessionWhereUniqueInputSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),
        z
          .lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema)
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),
        z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => SessionScalarWhereInputSchema),
        z.lazy(() => SessionScalarWhereInputSchema).array(),
      ])
      .optional(),
  })

export const AccountUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUpdateManyWithoutUserNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => AccountCreateWithoutUserInputSchema),
        z.lazy(() => AccountCreateWithoutUserInputSchema).array(),
        z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),
        z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),
        z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),
        z
          .lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => AccountCreateManyUserInputEnvelopeSchema)
      .optional(),
    set: z
      .union([
        z.lazy(() => AccountWhereUniqueInputSchema),
        z.lazy(() => AccountWhereUniqueInputSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => AccountWhereUniqueInputSchema),
        z.lazy(() => AccountWhereUniqueInputSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => AccountWhereUniqueInputSchema),
        z.lazy(() => AccountWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => AccountWhereUniqueInputSchema),
        z.lazy(() => AccountWhereUniqueInputSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),
        z
          .lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema)
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),
        z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => AccountScalarWhereInputSchema),
        z.lazy(() => AccountScalarWhereInputSchema).array(),
      ])
      .optional(),
  })

export const ThreadUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.ThreadUpdateManyWithoutAuthorNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => ThreadCreateWithoutAuthorInputSchema),
        z.lazy(() => ThreadCreateWithoutAuthorInputSchema).array(),
        z.lazy(() => ThreadUncheckedCreateWithoutAuthorInputSchema),
        z.lazy(() => ThreadUncheckedCreateWithoutAuthorInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => ThreadCreateOrConnectWithoutAuthorInputSchema),
        z.lazy(() => ThreadCreateOrConnectWithoutAuthorInputSchema).array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => ThreadUpsertWithWhereUniqueWithoutAuthorInputSchema),
        z
          .lazy(() => ThreadUpsertWithWhereUniqueWithoutAuthorInputSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => ThreadCreateManyAuthorInputEnvelopeSchema)
      .optional(),
    set: z
      .union([
        z.lazy(() => ThreadWhereUniqueInputSchema),
        z.lazy(() => ThreadWhereUniqueInputSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => ThreadWhereUniqueInputSchema),
        z.lazy(() => ThreadWhereUniqueInputSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => ThreadWhereUniqueInputSchema),
        z.lazy(() => ThreadWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => ThreadWhereUniqueInputSchema),
        z.lazy(() => ThreadWhereUniqueInputSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(() => ThreadUpdateWithWhereUniqueWithoutAuthorInputSchema),
        z
          .lazy(() => ThreadUpdateWithWhereUniqueWithoutAuthorInputSchema)
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => ThreadUpdateManyWithWhereWithoutAuthorInputSchema),
        z.lazy(() => ThreadUpdateManyWithWhereWithoutAuthorInputSchema).array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => ThreadScalarWhereInputSchema),
        z.lazy(() => ThreadScalarWhereInputSchema).array(),
      ])
      .optional(),
  })

export const SessionUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => SessionCreateWithoutUserInputSchema),
        z.lazy(() => SessionCreateWithoutUserInputSchema).array(),
        z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),
        z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema),
        z.lazy(() => SessionCreateOrConnectWithoutUserInputSchema).array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema),
        z
          .lazy(() => SessionUpsertWithWhereUniqueWithoutUserInputSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => SessionCreateManyUserInputEnvelopeSchema)
      .optional(),
    set: z
      .union([
        z.lazy(() => SessionWhereUniqueInputSchema),
        z.lazy(() => SessionWhereUniqueInputSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => SessionWhereUniqueInputSchema),
        z.lazy(() => SessionWhereUniqueInputSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => SessionWhereUniqueInputSchema),
        z.lazy(() => SessionWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => SessionWhereUniqueInputSchema),
        z.lazy(() => SessionWhereUniqueInputSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema),
        z
          .lazy(() => SessionUpdateWithWhereUniqueWithoutUserInputSchema)
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema),
        z.lazy(() => SessionUpdateManyWithWhereWithoutUserInputSchema).array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => SessionScalarWhereInputSchema),
        z.lazy(() => SessionScalarWhereInputSchema).array(),
      ])
      .optional(),
  })

export const AccountUncheckedUpdateManyWithoutUserNestedInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => AccountCreateWithoutUserInputSchema),
        z.lazy(() => AccountCreateWithoutUserInputSchema).array(),
        z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),
        z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema),
        z.lazy(() => AccountCreateOrConnectWithoutUserInputSchema).array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema),
        z
          .lazy(() => AccountUpsertWithWhereUniqueWithoutUserInputSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => AccountCreateManyUserInputEnvelopeSchema)
      .optional(),
    set: z
      .union([
        z.lazy(() => AccountWhereUniqueInputSchema),
        z.lazy(() => AccountWhereUniqueInputSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => AccountWhereUniqueInputSchema),
        z.lazy(() => AccountWhereUniqueInputSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => AccountWhereUniqueInputSchema),
        z.lazy(() => AccountWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => AccountWhereUniqueInputSchema),
        z.lazy(() => AccountWhereUniqueInputSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema),
        z
          .lazy(() => AccountUpdateWithWhereUniqueWithoutUserInputSchema)
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema),
        z.lazy(() => AccountUpdateManyWithWhereWithoutUserInputSchema).array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => AccountScalarWhereInputSchema),
        z.lazy(() => AccountScalarWhereInputSchema).array(),
      ])
      .optional(),
  })

export const ThreadUncheckedUpdateManyWithoutAuthorNestedInputSchema: z.ZodType<Prisma.ThreadUncheckedUpdateManyWithoutAuthorNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => ThreadCreateWithoutAuthorInputSchema),
        z.lazy(() => ThreadCreateWithoutAuthorInputSchema).array(),
        z.lazy(() => ThreadUncheckedCreateWithoutAuthorInputSchema),
        z.lazy(() => ThreadUncheckedCreateWithoutAuthorInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => ThreadCreateOrConnectWithoutAuthorInputSchema),
        z.lazy(() => ThreadCreateOrConnectWithoutAuthorInputSchema).array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => ThreadUpsertWithWhereUniqueWithoutAuthorInputSchema),
        z
          .lazy(() => ThreadUpsertWithWhereUniqueWithoutAuthorInputSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => ThreadCreateManyAuthorInputEnvelopeSchema)
      .optional(),
    set: z
      .union([
        z.lazy(() => ThreadWhereUniqueInputSchema),
        z.lazy(() => ThreadWhereUniqueInputSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => ThreadWhereUniqueInputSchema),
        z.lazy(() => ThreadWhereUniqueInputSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => ThreadWhereUniqueInputSchema),
        z.lazy(() => ThreadWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => ThreadWhereUniqueInputSchema),
        z.lazy(() => ThreadWhereUniqueInputSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(() => ThreadUpdateWithWhereUniqueWithoutAuthorInputSchema),
        z
          .lazy(() => ThreadUpdateWithWhereUniqueWithoutAuthorInputSchema)
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => ThreadUpdateManyWithWhereWithoutAuthorInputSchema),
        z.lazy(() => ThreadUpdateManyWithWhereWithoutAuthorInputSchema).array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => ThreadScalarWhereInputSchema),
        z.lazy(() => ThreadScalarWhereInputSchema).array(),
      ])
      .optional(),
  })

export const UserCreateNestedOneWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutSessionsInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => UserCreateWithoutSessionsInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => UserCreateOrConnectWithoutSessionsInputSchema)
      .optional(),
    connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  })

export const UserUpdateOneRequiredWithoutSessionsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutSessionsNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => UserCreateWithoutSessionsInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => UserCreateOrConnectWithoutSessionsInputSchema)
      .optional(),
    upsert: z.lazy(() => UserUpsertWithoutSessionsInputSchema).optional(),
    connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
    update: z
      .union([
        z.lazy(() => UserUpdateToOneWithWhereWithoutSessionsInputSchema),
        z.lazy(() => UserUpdateWithoutSessionsInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema),
      ])
      .optional(),
  })

export const UserCreateNestedOneWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutAccountsInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => UserCreateWithoutAccountsInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => UserCreateOrConnectWithoutAccountsInputSchema)
      .optional(),
    connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  })

export const NullableDateTimeFieldUpdateOperationsInputSchema: z.ZodType<Prisma.NullableDateTimeFieldUpdateOperationsInput> =
  z.strictObject({
    set: z.coerce.date().optional().nullable(),
  })

export const UserUpdateOneRequiredWithoutAccountsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutAccountsNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => UserCreateWithoutAccountsInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => UserCreateOrConnectWithoutAccountsInputSchema)
      .optional(),
    upsert: z.lazy(() => UserUpsertWithoutAccountsInputSchema).optional(),
    connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
    update: z
      .union([
        z.lazy(() => UserUpdateToOneWithWhereWithoutAccountsInputSchema),
        z.lazy(() => UserUpdateWithoutAccountsInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema),
      ])
      .optional(),
  })

export const ThreadCreateNestedManyWithoutCategoryInputSchema: z.ZodType<Prisma.ThreadCreateNestedManyWithoutCategoryInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => ThreadCreateWithoutCategoryInputSchema),
        z.lazy(() => ThreadCreateWithoutCategoryInputSchema).array(),
        z.lazy(() => ThreadUncheckedCreateWithoutCategoryInputSchema),
        z.lazy(() => ThreadUncheckedCreateWithoutCategoryInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => ThreadCreateOrConnectWithoutCategoryInputSchema),
        z.lazy(() => ThreadCreateOrConnectWithoutCategoryInputSchema).array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => ThreadCreateManyCategoryInputEnvelopeSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => ThreadWhereUniqueInputSchema),
        z.lazy(() => ThreadWhereUniqueInputSchema).array(),
      ])
      .optional(),
  })

export const ThreadUncheckedCreateNestedManyWithoutCategoryInputSchema: z.ZodType<Prisma.ThreadUncheckedCreateNestedManyWithoutCategoryInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => ThreadCreateWithoutCategoryInputSchema),
        z.lazy(() => ThreadCreateWithoutCategoryInputSchema).array(),
        z.lazy(() => ThreadUncheckedCreateWithoutCategoryInputSchema),
        z.lazy(() => ThreadUncheckedCreateWithoutCategoryInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => ThreadCreateOrConnectWithoutCategoryInputSchema),
        z.lazy(() => ThreadCreateOrConnectWithoutCategoryInputSchema).array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => ThreadCreateManyCategoryInputEnvelopeSchema)
      .optional(),
    connect: z
      .union([
        z.lazy(() => ThreadWhereUniqueInputSchema),
        z.lazy(() => ThreadWhereUniqueInputSchema).array(),
      ])
      .optional(),
  })

export const ThreadUpdateManyWithoutCategoryNestedInputSchema: z.ZodType<Prisma.ThreadUpdateManyWithoutCategoryNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => ThreadCreateWithoutCategoryInputSchema),
        z.lazy(() => ThreadCreateWithoutCategoryInputSchema).array(),
        z.lazy(() => ThreadUncheckedCreateWithoutCategoryInputSchema),
        z.lazy(() => ThreadUncheckedCreateWithoutCategoryInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => ThreadCreateOrConnectWithoutCategoryInputSchema),
        z.lazy(() => ThreadCreateOrConnectWithoutCategoryInputSchema).array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => ThreadUpsertWithWhereUniqueWithoutCategoryInputSchema),
        z
          .lazy(() => ThreadUpsertWithWhereUniqueWithoutCategoryInputSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => ThreadCreateManyCategoryInputEnvelopeSchema)
      .optional(),
    set: z
      .union([
        z.lazy(() => ThreadWhereUniqueInputSchema),
        z.lazy(() => ThreadWhereUniqueInputSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => ThreadWhereUniqueInputSchema),
        z.lazy(() => ThreadWhereUniqueInputSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => ThreadWhereUniqueInputSchema),
        z.lazy(() => ThreadWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => ThreadWhereUniqueInputSchema),
        z.lazy(() => ThreadWhereUniqueInputSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(() => ThreadUpdateWithWhereUniqueWithoutCategoryInputSchema),
        z
          .lazy(() => ThreadUpdateWithWhereUniqueWithoutCategoryInputSchema)
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => ThreadUpdateManyWithWhereWithoutCategoryInputSchema),
        z
          .lazy(() => ThreadUpdateManyWithWhereWithoutCategoryInputSchema)
          .array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => ThreadScalarWhereInputSchema),
        z.lazy(() => ThreadScalarWhereInputSchema).array(),
      ])
      .optional(),
  })

export const ThreadUncheckedUpdateManyWithoutCategoryNestedInputSchema: z.ZodType<Prisma.ThreadUncheckedUpdateManyWithoutCategoryNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => ThreadCreateWithoutCategoryInputSchema),
        z.lazy(() => ThreadCreateWithoutCategoryInputSchema).array(),
        z.lazy(() => ThreadUncheckedCreateWithoutCategoryInputSchema),
        z.lazy(() => ThreadUncheckedCreateWithoutCategoryInputSchema).array(),
      ])
      .optional(),
    connectOrCreate: z
      .union([
        z.lazy(() => ThreadCreateOrConnectWithoutCategoryInputSchema),
        z.lazy(() => ThreadCreateOrConnectWithoutCategoryInputSchema).array(),
      ])
      .optional(),
    upsert: z
      .union([
        z.lazy(() => ThreadUpsertWithWhereUniqueWithoutCategoryInputSchema),
        z
          .lazy(() => ThreadUpsertWithWhereUniqueWithoutCategoryInputSchema)
          .array(),
      ])
      .optional(),
    createMany: z
      .lazy(() => ThreadCreateManyCategoryInputEnvelopeSchema)
      .optional(),
    set: z
      .union([
        z.lazy(() => ThreadWhereUniqueInputSchema),
        z.lazy(() => ThreadWhereUniqueInputSchema).array(),
      ])
      .optional(),
    disconnect: z
      .union([
        z.lazy(() => ThreadWhereUniqueInputSchema),
        z.lazy(() => ThreadWhereUniqueInputSchema).array(),
      ])
      .optional(),
    delete: z
      .union([
        z.lazy(() => ThreadWhereUniqueInputSchema),
        z.lazy(() => ThreadWhereUniqueInputSchema).array(),
      ])
      .optional(),
    connect: z
      .union([
        z.lazy(() => ThreadWhereUniqueInputSchema),
        z.lazy(() => ThreadWhereUniqueInputSchema).array(),
      ])
      .optional(),
    update: z
      .union([
        z.lazy(() => ThreadUpdateWithWhereUniqueWithoutCategoryInputSchema),
        z
          .lazy(() => ThreadUpdateWithWhereUniqueWithoutCategoryInputSchema)
          .array(),
      ])
      .optional(),
    updateMany: z
      .union([
        z.lazy(() => ThreadUpdateManyWithWhereWithoutCategoryInputSchema),
        z
          .lazy(() => ThreadUpdateManyWithWhereWithoutCategoryInputSchema)
          .array(),
      ])
      .optional(),
    deleteMany: z
      .union([
        z.lazy(() => ThreadScalarWhereInputSchema),
        z.lazy(() => ThreadScalarWhereInputSchema).array(),
      ])
      .optional(),
  })

export const UserCreateNestedOneWithoutThreadsInputSchema: z.ZodType<Prisma.UserCreateNestedOneWithoutThreadsInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => UserCreateWithoutThreadsInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutThreadsInputSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => UserCreateOrConnectWithoutThreadsInputSchema)
      .optional(),
    connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
  })

export const CategoryCreateNestedOneWithoutThreadsInputSchema: z.ZodType<Prisma.CategoryCreateNestedOneWithoutThreadsInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => CategoryCreateWithoutThreadsInputSchema),
        z.lazy(() => CategoryUncheckedCreateWithoutThreadsInputSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => CategoryCreateOrConnectWithoutThreadsInputSchema)
      .optional(),
    connect: z.lazy(() => CategoryWhereUniqueInputSchema).optional(),
  })

export const UserUpdateOneRequiredWithoutThreadsNestedInputSchema: z.ZodType<Prisma.UserUpdateOneRequiredWithoutThreadsNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => UserCreateWithoutThreadsInputSchema),
        z.lazy(() => UserUncheckedCreateWithoutThreadsInputSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => UserCreateOrConnectWithoutThreadsInputSchema)
      .optional(),
    upsert: z.lazy(() => UserUpsertWithoutThreadsInputSchema).optional(),
    connect: z.lazy(() => UserWhereUniqueInputSchema).optional(),
    update: z
      .union([
        z.lazy(() => UserUpdateToOneWithWhereWithoutThreadsInputSchema),
        z.lazy(() => UserUpdateWithoutThreadsInputSchema),
        z.lazy(() => UserUncheckedUpdateWithoutThreadsInputSchema),
      ])
      .optional(),
  })

export const CategoryUpdateOneRequiredWithoutThreadsNestedInputSchema: z.ZodType<Prisma.CategoryUpdateOneRequiredWithoutThreadsNestedInput> =
  z.strictObject({
    create: z
      .union([
        z.lazy(() => CategoryCreateWithoutThreadsInputSchema),
        z.lazy(() => CategoryUncheckedCreateWithoutThreadsInputSchema),
      ])
      .optional(),
    connectOrCreate: z
      .lazy(() => CategoryCreateOrConnectWithoutThreadsInputSchema)
      .optional(),
    upsert: z.lazy(() => CategoryUpsertWithoutThreadsInputSchema).optional(),
    connect: z.lazy(() => CategoryWhereUniqueInputSchema).optional(),
    update: z
      .union([
        z.lazy(() => CategoryUpdateToOneWithWhereWithoutThreadsInputSchema),
        z.lazy(() => CategoryUpdateWithoutThreadsInputSchema),
        z.lazy(() => CategoryUncheckedUpdateWithoutThreadsInputSchema),
      ])
      .optional(),
  })

export const NestedStringFilterSchema: z.ZodType<Prisma.NestedStringFilter> =
  z.strictObject({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringFilterSchema)])
      .optional(),
  })

export const NestedBoolFilterSchema: z.ZodType<Prisma.NestedBoolFilter> =
  z.strictObject({
    equals: z.boolean().optional(),
    not: z
      .union([z.boolean(), z.lazy(() => NestedBoolFilterSchema)])
      .optional(),
  })

export const NestedStringNullableFilterSchema: z.ZodType<Prisma.NestedStringNullableFilter> =
  z.strictObject({
    equals: z.string().optional().nullable(),
    in: z.string().array().optional().nullable(),
    notIn: z.string().array().optional().nullable(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringNullableFilterSchema)])
      .optional()
      .nullable(),
  })

export const NestedDateTimeFilterSchema: z.ZodType<Prisma.NestedDateTimeFilter> =
  z.strictObject({
    equals: z.coerce.date().optional(),
    in: z.coerce.date().array().optional(),
    notIn: z.coerce.date().array().optional(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    not: z
      .union([z.coerce.date(), z.lazy(() => NestedDateTimeFilterSchema)])
      .optional(),
  })

export const NestedStringWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringWithAggregatesFilter> =
  z.strictObject({
    equals: z.string().optional(),
    in: z.string().array().optional(),
    notIn: z.string().array().optional(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    not: z
      .union([z.string(), z.lazy(() => NestedStringWithAggregatesFilterSchema)])
      .optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedStringFilterSchema).optional(),
    _max: z.lazy(() => NestedStringFilterSchema).optional(),
  })

export const NestedIntFilterSchema: z.ZodType<Prisma.NestedIntFilter> =
  z.strictObject({
    equals: z.number().optional(),
    in: z.number().array().optional(),
    notIn: z.number().array().optional(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z.union([z.number(), z.lazy(() => NestedIntFilterSchema)]).optional(),
  })

export const NestedBoolWithAggregatesFilterSchema: z.ZodType<Prisma.NestedBoolWithAggregatesFilter> =
  z.strictObject({
    equals: z.boolean().optional(),
    not: z
      .union([z.boolean(), z.lazy(() => NestedBoolWithAggregatesFilterSchema)])
      .optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedBoolFilterSchema).optional(),
    _max: z.lazy(() => NestedBoolFilterSchema).optional(),
  })

export const NestedStringNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedStringNullableWithAggregatesFilter> =
  z.strictObject({
    equals: z.string().optional().nullable(),
    in: z.string().array().optional().nullable(),
    notIn: z.string().array().optional().nullable(),
    lt: z.string().optional(),
    lte: z.string().optional(),
    gt: z.string().optional(),
    gte: z.string().optional(),
    contains: z.string().optional(),
    startsWith: z.string().optional(),
    endsWith: z.string().optional(),
    not: z
      .union([
        z.string(),
        z.lazy(() => NestedStringNullableWithAggregatesFilterSchema),
      ])
      .optional()
      .nullable(),
    _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    _min: z.lazy(() => NestedStringNullableFilterSchema).optional(),
    _max: z.lazy(() => NestedStringNullableFilterSchema).optional(),
  })

export const NestedIntNullableFilterSchema: z.ZodType<Prisma.NestedIntNullableFilter> =
  z.strictObject({
    equals: z.number().optional().nullable(),
    in: z.number().array().optional().nullable(),
    notIn: z.number().array().optional().nullable(),
    lt: z.number().optional(),
    lte: z.number().optional(),
    gt: z.number().optional(),
    gte: z.number().optional(),
    not: z
      .union([z.number(), z.lazy(() => NestedIntNullableFilterSchema)])
      .optional()
      .nullable(),
  })

export const NestedDateTimeWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeWithAggregatesFilter> =
  z.strictObject({
    equals: z.coerce.date().optional(),
    in: z.coerce.date().array().optional(),
    notIn: z.coerce.date().array().optional(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    not: z
      .union([
        z.coerce.date(),
        z.lazy(() => NestedDateTimeWithAggregatesFilterSchema),
      ])
      .optional(),
    _count: z.lazy(() => NestedIntFilterSchema).optional(),
    _min: z.lazy(() => NestedDateTimeFilterSchema).optional(),
    _max: z.lazy(() => NestedDateTimeFilterSchema).optional(),
  })

export const NestedDateTimeNullableFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableFilter> =
  z.strictObject({
    equals: z.coerce.date().optional().nullable(),
    in: z.coerce.date().array().optional().nullable(),
    notIn: z.coerce.date().array().optional().nullable(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    not: z
      .union([
        z.coerce.date(),
        z.lazy(() => NestedDateTimeNullableFilterSchema),
      ])
      .optional()
      .nullable(),
  })

export const NestedDateTimeNullableWithAggregatesFilterSchema: z.ZodType<Prisma.NestedDateTimeNullableWithAggregatesFilter> =
  z.strictObject({
    equals: z.coerce.date().optional().nullable(),
    in: z.coerce.date().array().optional().nullable(),
    notIn: z.coerce.date().array().optional().nullable(),
    lt: z.coerce.date().optional(),
    lte: z.coerce.date().optional(),
    gt: z.coerce.date().optional(),
    gte: z.coerce.date().optional(),
    not: z
      .union([
        z.coerce.date(),
        z.lazy(() => NestedDateTimeNullableWithAggregatesFilterSchema),
      ])
      .optional()
      .nullable(),
    _count: z.lazy(() => NestedIntNullableFilterSchema).optional(),
    _min: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
    _max: z.lazy(() => NestedDateTimeNullableFilterSchema).optional(),
  })

export const SessionCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateWithoutUserInput> =
  z.strictObject({
    id: z.string(),
    expiresAt: z.coerce.date(),
    token: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    ipAddress: z.string().optional().nullable(),
    userAgent: z.string().optional().nullable(),
  })

export const SessionUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedCreateWithoutUserInput> =
  z.strictObject({
    id: z.string(),
    expiresAt: z.coerce.date(),
    token: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    ipAddress: z.string().optional().nullable(),
    userAgent: z.string().optional().nullable(),
  })

export const SessionCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.SessionCreateOrConnectWithoutUserInput> =
  z.strictObject({
    where: z.lazy(() => SessionWhereUniqueInputSchema),
    create: z.union([
      z.lazy(() => SessionCreateWithoutUserInputSchema),
      z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),
    ]),
  })

export const SessionCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.SessionCreateManyUserInputEnvelope> =
  z.strictObject({
    data: z.union([
      z.lazy(() => SessionCreateManyUserInputSchema),
      z.lazy(() => SessionCreateManyUserInputSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })

export const AccountCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateWithoutUserInput> =
  z.strictObject({
    id: z.string(),
    accountId: z.string(),
    providerId: z.string(),
    accessToken: z.string().optional().nullable(),
    refreshToken: z.string().optional().nullable(),
    idToken: z.string().optional().nullable(),
    accessTokenExpiresAt: z.coerce.date().optional().nullable(),
    refreshTokenExpiresAt: z.coerce.date().optional().nullable(),
    scope: z.string().optional().nullable(),
    password: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  })

export const AccountUncheckedCreateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedCreateWithoutUserInput> =
  z.strictObject({
    id: z.string(),
    accountId: z.string(),
    providerId: z.string(),
    accessToken: z.string().optional().nullable(),
    refreshToken: z.string().optional().nullable(),
    idToken: z.string().optional().nullable(),
    accessTokenExpiresAt: z.coerce.date().optional().nullable(),
    refreshTokenExpiresAt: z.coerce.date().optional().nullable(),
    scope: z.string().optional().nullable(),
    password: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  })

export const AccountCreateOrConnectWithoutUserInputSchema: z.ZodType<Prisma.AccountCreateOrConnectWithoutUserInput> =
  z.strictObject({
    where: z.lazy(() => AccountWhereUniqueInputSchema),
    create: z.union([
      z.lazy(() => AccountCreateWithoutUserInputSchema),
      z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),
    ]),
  })

export const AccountCreateManyUserInputEnvelopeSchema: z.ZodType<Prisma.AccountCreateManyUserInputEnvelope> =
  z.strictObject({
    data: z.union([
      z.lazy(() => AccountCreateManyUserInputSchema),
      z.lazy(() => AccountCreateManyUserInputSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })

export const ThreadCreateWithoutAuthorInputSchema: z.ZodType<Prisma.ThreadCreateWithoutAuthorInput> =
  z.strictObject({
    id: z.cuid().optional(),
    title: z.string(),
    brief: z.string(),
    content: z.string(),
    isFlagged: z.boolean().optional(),
    flagReason: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    Category: z.lazy(() => CategoryCreateNestedOneWithoutThreadsInputSchema),
  })

export const ThreadUncheckedCreateWithoutAuthorInputSchema: z.ZodType<Prisma.ThreadUncheckedCreateWithoutAuthorInput> =
  z.strictObject({
    id: z.cuid().optional(),
    title: z.string(),
    brief: z.string(),
    content: z.string(),
    isFlagged: z.boolean().optional(),
    flagReason: z.string().optional().nullable(),
    categoryId: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  })

export const ThreadCreateOrConnectWithoutAuthorInputSchema: z.ZodType<Prisma.ThreadCreateOrConnectWithoutAuthorInput> =
  z.strictObject({
    where: z.lazy(() => ThreadWhereUniqueInputSchema),
    create: z.union([
      z.lazy(() => ThreadCreateWithoutAuthorInputSchema),
      z.lazy(() => ThreadUncheckedCreateWithoutAuthorInputSchema),
    ]),
  })

export const ThreadCreateManyAuthorInputEnvelopeSchema: z.ZodType<Prisma.ThreadCreateManyAuthorInputEnvelope> =
  z.strictObject({
    data: z.union([
      z.lazy(() => ThreadCreateManyAuthorInputSchema),
      z.lazy(() => ThreadCreateManyAuthorInputSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })

export const SessionUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpsertWithWhereUniqueWithoutUserInput> =
  z.strictObject({
    where: z.lazy(() => SessionWhereUniqueInputSchema),
    update: z.union([
      z.lazy(() => SessionUpdateWithoutUserInputSchema),
      z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema),
    ]),
    create: z.union([
      z.lazy(() => SessionCreateWithoutUserInputSchema),
      z.lazy(() => SessionUncheckedCreateWithoutUserInputSchema),
    ]),
  })

export const SessionUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithWhereUniqueWithoutUserInput> =
  z.strictObject({
    where: z.lazy(() => SessionWhereUniqueInputSchema),
    data: z.union([
      z.lazy(() => SessionUpdateWithoutUserInputSchema),
      z.lazy(() => SessionUncheckedUpdateWithoutUserInputSchema),
    ]),
  })

export const SessionUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateManyWithWhereWithoutUserInput> =
  z.strictObject({
    where: z.lazy(() => SessionScalarWhereInputSchema),
    data: z.union([
      z.lazy(() => SessionUpdateManyMutationInputSchema),
      z.lazy(() => SessionUncheckedUpdateManyWithoutUserInputSchema),
    ]),
  })

export const SessionScalarWhereInputSchema: z.ZodType<Prisma.SessionScalarWhereInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => SessionScalarWhereInputSchema),
        z.lazy(() => SessionScalarWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => SessionScalarWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => SessionScalarWhereInputSchema),
        z.lazy(() => SessionScalarWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    expiresAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    token: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    ipAddress: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    userAgent: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
  })

export const AccountUpsertWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpsertWithWhereUniqueWithoutUserInput> =
  z.strictObject({
    where: z.lazy(() => AccountWhereUniqueInputSchema),
    update: z.union([
      z.lazy(() => AccountUpdateWithoutUserInputSchema),
      z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema),
    ]),
    create: z.union([
      z.lazy(() => AccountCreateWithoutUserInputSchema),
      z.lazy(() => AccountUncheckedCreateWithoutUserInputSchema),
    ]),
  })

export const AccountUpdateWithWhereUniqueWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithWhereUniqueWithoutUserInput> =
  z.strictObject({
    where: z.lazy(() => AccountWhereUniqueInputSchema),
    data: z.union([
      z.lazy(() => AccountUpdateWithoutUserInputSchema),
      z.lazy(() => AccountUncheckedUpdateWithoutUserInputSchema),
    ]),
  })

export const AccountUpdateManyWithWhereWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateManyWithWhereWithoutUserInput> =
  z.strictObject({
    where: z.lazy(() => AccountScalarWhereInputSchema),
    data: z.union([
      z.lazy(() => AccountUpdateManyMutationInputSchema),
      z.lazy(() => AccountUncheckedUpdateManyWithoutUserInputSchema),
    ]),
  })

export const AccountScalarWhereInputSchema: z.ZodType<Prisma.AccountScalarWhereInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => AccountScalarWhereInputSchema),
        z.lazy(() => AccountScalarWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => AccountScalarWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => AccountScalarWhereInputSchema),
        z.lazy(() => AccountScalarWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    accountId: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    providerId: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    accessToken: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    refreshToken: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    idToken: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    accessTokenExpiresAt: z
      .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
      .optional()
      .nullable(),
    refreshTokenExpiresAt: z
      .union([z.lazy(() => DateTimeNullableFilterSchema), z.coerce.date()])
      .optional()
      .nullable(),
    scope: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    password: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
  })

export const ThreadUpsertWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.ThreadUpsertWithWhereUniqueWithoutAuthorInput> =
  z.strictObject({
    where: z.lazy(() => ThreadWhereUniqueInputSchema),
    update: z.union([
      z.lazy(() => ThreadUpdateWithoutAuthorInputSchema),
      z.lazy(() => ThreadUncheckedUpdateWithoutAuthorInputSchema),
    ]),
    create: z.union([
      z.lazy(() => ThreadCreateWithoutAuthorInputSchema),
      z.lazy(() => ThreadUncheckedCreateWithoutAuthorInputSchema),
    ]),
  })

export const ThreadUpdateWithWhereUniqueWithoutAuthorInputSchema: z.ZodType<Prisma.ThreadUpdateWithWhereUniqueWithoutAuthorInput> =
  z.strictObject({
    where: z.lazy(() => ThreadWhereUniqueInputSchema),
    data: z.union([
      z.lazy(() => ThreadUpdateWithoutAuthorInputSchema),
      z.lazy(() => ThreadUncheckedUpdateWithoutAuthorInputSchema),
    ]),
  })

export const ThreadUpdateManyWithWhereWithoutAuthorInputSchema: z.ZodType<Prisma.ThreadUpdateManyWithWhereWithoutAuthorInput> =
  z.strictObject({
    where: z.lazy(() => ThreadScalarWhereInputSchema),
    data: z.union([
      z.lazy(() => ThreadUpdateManyMutationInputSchema),
      z.lazy(() => ThreadUncheckedUpdateManyWithoutAuthorInputSchema),
    ]),
  })

export const ThreadScalarWhereInputSchema: z.ZodType<Prisma.ThreadScalarWhereInput> =
  z.strictObject({
    AND: z
      .union([
        z.lazy(() => ThreadScalarWhereInputSchema),
        z.lazy(() => ThreadScalarWhereInputSchema).array(),
      ])
      .optional(),
    OR: z
      .lazy(() => ThreadScalarWhereInputSchema)
      .array()
      .optional(),
    NOT: z
      .union([
        z.lazy(() => ThreadScalarWhereInputSchema),
        z.lazy(() => ThreadScalarWhereInputSchema).array(),
      ])
      .optional(),
    id: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    title: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    brief: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    content: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    isFlagged: z
      .union([z.lazy(() => BoolFilterSchema), z.boolean()])
      .optional(),
    flagReason: z
      .union([z.lazy(() => StringNullableFilterSchema), z.string()])
      .optional()
      .nullable(),
    categoryId: z
      .union([z.lazy(() => StringFilterSchema), z.string()])
      .optional(),
    userId: z.union([z.lazy(() => StringFilterSchema), z.string()]).optional(),
    createdAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
    updatedAt: z
      .union([z.lazy(() => DateTimeFilterSchema), z.coerce.date()])
      .optional(),
  })

export const UserCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateWithoutSessionsInput> =
  z.strictObject({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    emailVerified: z.boolean().optional(),
    image: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    accounts: z
      .lazy(() => AccountCreateNestedManyWithoutUserInputSchema)
      .optional(),
    threads: z
      .lazy(() => ThreadCreateNestedManyWithoutAuthorInputSchema)
      .optional(),
  })

export const UserUncheckedCreateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutSessionsInput> =
  z.strictObject({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    emailVerified: z.boolean().optional(),
    image: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    accounts: z
      .lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema)
      .optional(),
    threads: z
      .lazy(() => ThreadUncheckedCreateNestedManyWithoutAuthorInputSchema)
      .optional(),
  })

export const UserCreateOrConnectWithoutSessionsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutSessionsInput> =
  z.strictObject({
    where: z.lazy(() => UserWhereUniqueInputSchema),
    create: z.union([
      z.lazy(() => UserCreateWithoutSessionsInputSchema),
      z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema),
    ]),
  })

export const UserUpsertWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpsertWithoutSessionsInput> =
  z.strictObject({
    update: z.union([
      z.lazy(() => UserUpdateWithoutSessionsInputSchema),
      z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema),
    ]),
    create: z.union([
      z.lazy(() => UserCreateWithoutSessionsInputSchema),
      z.lazy(() => UserUncheckedCreateWithoutSessionsInputSchema),
    ]),
    where: z.lazy(() => UserWhereInputSchema).optional(),
  })

export const UserUpdateToOneWithWhereWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutSessionsInput> =
  z.strictObject({
    where: z.lazy(() => UserWhereInputSchema).optional(),
    data: z.union([
      z.lazy(() => UserUpdateWithoutSessionsInputSchema),
      z.lazy(() => UserUncheckedUpdateWithoutSessionsInputSchema),
    ]),
  })

export const UserUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUpdateWithoutSessionsInput> =
  z.strictObject({
    id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    email: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    emailVerified: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    image: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    accounts: z
      .lazy(() => AccountUpdateManyWithoutUserNestedInputSchema)
      .optional(),
    threads: z
      .lazy(() => ThreadUpdateManyWithoutAuthorNestedInputSchema)
      .optional(),
  })

export const UserUncheckedUpdateWithoutSessionsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutSessionsInput> =
  z.strictObject({
    id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    email: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    emailVerified: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    image: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    accounts: z
      .lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema)
      .optional(),
    threads: z
      .lazy(() => ThreadUncheckedUpdateManyWithoutAuthorNestedInputSchema)
      .optional(),
  })

export const UserCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateWithoutAccountsInput> =
  z.strictObject({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    emailVerified: z.boolean().optional(),
    image: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    sessions: z
      .lazy(() => SessionCreateNestedManyWithoutUserInputSchema)
      .optional(),
    threads: z
      .lazy(() => ThreadCreateNestedManyWithoutAuthorInputSchema)
      .optional(),
  })

export const UserUncheckedCreateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutAccountsInput> =
  z.strictObject({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    emailVerified: z.boolean().optional(),
    image: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    sessions: z
      .lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema)
      .optional(),
    threads: z
      .lazy(() => ThreadUncheckedCreateNestedManyWithoutAuthorInputSchema)
      .optional(),
  })

export const UserCreateOrConnectWithoutAccountsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutAccountsInput> =
  z.strictObject({
    where: z.lazy(() => UserWhereUniqueInputSchema),
    create: z.union([
      z.lazy(() => UserCreateWithoutAccountsInputSchema),
      z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema),
    ]),
  })

export const UserUpsertWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpsertWithoutAccountsInput> =
  z.strictObject({
    update: z.union([
      z.lazy(() => UserUpdateWithoutAccountsInputSchema),
      z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema),
    ]),
    create: z.union([
      z.lazy(() => UserCreateWithoutAccountsInputSchema),
      z.lazy(() => UserUncheckedCreateWithoutAccountsInputSchema),
    ]),
    where: z.lazy(() => UserWhereInputSchema).optional(),
  })

export const UserUpdateToOneWithWhereWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutAccountsInput> =
  z.strictObject({
    where: z.lazy(() => UserWhereInputSchema).optional(),
    data: z.union([
      z.lazy(() => UserUpdateWithoutAccountsInputSchema),
      z.lazy(() => UserUncheckedUpdateWithoutAccountsInputSchema),
    ]),
  })

export const UserUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUpdateWithoutAccountsInput> =
  z.strictObject({
    id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    email: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    emailVerified: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    image: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    sessions: z
      .lazy(() => SessionUpdateManyWithoutUserNestedInputSchema)
      .optional(),
    threads: z
      .lazy(() => ThreadUpdateManyWithoutAuthorNestedInputSchema)
      .optional(),
  })

export const UserUncheckedUpdateWithoutAccountsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutAccountsInput> =
  z.strictObject({
    id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    email: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    emailVerified: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    image: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    sessions: z
      .lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema)
      .optional(),
    threads: z
      .lazy(() => ThreadUncheckedUpdateManyWithoutAuthorNestedInputSchema)
      .optional(),
  })

export const ThreadCreateWithoutCategoryInputSchema: z.ZodType<Prisma.ThreadCreateWithoutCategoryInput> =
  z.strictObject({
    id: z.cuid().optional(),
    title: z.string(),
    brief: z.string(),
    content: z.string(),
    isFlagged: z.boolean().optional(),
    flagReason: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    author: z.lazy(() => UserCreateNestedOneWithoutThreadsInputSchema),
  })

export const ThreadUncheckedCreateWithoutCategoryInputSchema: z.ZodType<Prisma.ThreadUncheckedCreateWithoutCategoryInput> =
  z.strictObject({
    id: z.cuid().optional(),
    title: z.string(),
    brief: z.string(),
    content: z.string(),
    isFlagged: z.boolean().optional(),
    flagReason: z.string().optional().nullable(),
    userId: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  })

export const ThreadCreateOrConnectWithoutCategoryInputSchema: z.ZodType<Prisma.ThreadCreateOrConnectWithoutCategoryInput> =
  z.strictObject({
    where: z.lazy(() => ThreadWhereUniqueInputSchema),
    create: z.union([
      z.lazy(() => ThreadCreateWithoutCategoryInputSchema),
      z.lazy(() => ThreadUncheckedCreateWithoutCategoryInputSchema),
    ]),
  })

export const ThreadCreateManyCategoryInputEnvelopeSchema: z.ZodType<Prisma.ThreadCreateManyCategoryInputEnvelope> =
  z.strictObject({
    data: z.union([
      z.lazy(() => ThreadCreateManyCategoryInputSchema),
      z.lazy(() => ThreadCreateManyCategoryInputSchema).array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })

export const ThreadUpsertWithWhereUniqueWithoutCategoryInputSchema: z.ZodType<Prisma.ThreadUpsertWithWhereUniqueWithoutCategoryInput> =
  z.strictObject({
    where: z.lazy(() => ThreadWhereUniqueInputSchema),
    update: z.union([
      z.lazy(() => ThreadUpdateWithoutCategoryInputSchema),
      z.lazy(() => ThreadUncheckedUpdateWithoutCategoryInputSchema),
    ]),
    create: z.union([
      z.lazy(() => ThreadCreateWithoutCategoryInputSchema),
      z.lazy(() => ThreadUncheckedCreateWithoutCategoryInputSchema),
    ]),
  })

export const ThreadUpdateWithWhereUniqueWithoutCategoryInputSchema: z.ZodType<Prisma.ThreadUpdateWithWhereUniqueWithoutCategoryInput> =
  z.strictObject({
    where: z.lazy(() => ThreadWhereUniqueInputSchema),
    data: z.union([
      z.lazy(() => ThreadUpdateWithoutCategoryInputSchema),
      z.lazy(() => ThreadUncheckedUpdateWithoutCategoryInputSchema),
    ]),
  })

export const ThreadUpdateManyWithWhereWithoutCategoryInputSchema: z.ZodType<Prisma.ThreadUpdateManyWithWhereWithoutCategoryInput> =
  z.strictObject({
    where: z.lazy(() => ThreadScalarWhereInputSchema),
    data: z.union([
      z.lazy(() => ThreadUpdateManyMutationInputSchema),
      z.lazy(() => ThreadUncheckedUpdateManyWithoutCategoryInputSchema),
    ]),
  })

export const UserCreateWithoutThreadsInputSchema: z.ZodType<Prisma.UserCreateWithoutThreadsInput> =
  z.strictObject({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    emailVerified: z.boolean().optional(),
    image: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    sessions: z
      .lazy(() => SessionCreateNestedManyWithoutUserInputSchema)
      .optional(),
    accounts: z
      .lazy(() => AccountCreateNestedManyWithoutUserInputSchema)
      .optional(),
  })

export const UserUncheckedCreateWithoutThreadsInputSchema: z.ZodType<Prisma.UserUncheckedCreateWithoutThreadsInput> =
  z.strictObject({
    id: z.string(),
    name: z.string(),
    email: z.string(),
    emailVerified: z.boolean().optional(),
    image: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    sessions: z
      .lazy(() => SessionUncheckedCreateNestedManyWithoutUserInputSchema)
      .optional(),
    accounts: z
      .lazy(() => AccountUncheckedCreateNestedManyWithoutUserInputSchema)
      .optional(),
  })

export const UserCreateOrConnectWithoutThreadsInputSchema: z.ZodType<Prisma.UserCreateOrConnectWithoutThreadsInput> =
  z.strictObject({
    where: z.lazy(() => UserWhereUniqueInputSchema),
    create: z.union([
      z.lazy(() => UserCreateWithoutThreadsInputSchema),
      z.lazy(() => UserUncheckedCreateWithoutThreadsInputSchema),
    ]),
  })

export const CategoryCreateWithoutThreadsInputSchema: z.ZodType<Prisma.CategoryCreateWithoutThreadsInput> =
  z.strictObject({
    id: z.cuid().optional(),
    name: z.string(),
    emoji: z.string(),
  })

export const CategoryUncheckedCreateWithoutThreadsInputSchema: z.ZodType<Prisma.CategoryUncheckedCreateWithoutThreadsInput> =
  z.strictObject({
    id: z.cuid().optional(),
    name: z.string(),
    emoji: z.string(),
  })

export const CategoryCreateOrConnectWithoutThreadsInputSchema: z.ZodType<Prisma.CategoryCreateOrConnectWithoutThreadsInput> =
  z.strictObject({
    where: z.lazy(() => CategoryWhereUniqueInputSchema),
    create: z.union([
      z.lazy(() => CategoryCreateWithoutThreadsInputSchema),
      z.lazy(() => CategoryUncheckedCreateWithoutThreadsInputSchema),
    ]),
  })

export const UserUpsertWithoutThreadsInputSchema: z.ZodType<Prisma.UserUpsertWithoutThreadsInput> =
  z.strictObject({
    update: z.union([
      z.lazy(() => UserUpdateWithoutThreadsInputSchema),
      z.lazy(() => UserUncheckedUpdateWithoutThreadsInputSchema),
    ]),
    create: z.union([
      z.lazy(() => UserCreateWithoutThreadsInputSchema),
      z.lazy(() => UserUncheckedCreateWithoutThreadsInputSchema),
    ]),
    where: z.lazy(() => UserWhereInputSchema).optional(),
  })

export const UserUpdateToOneWithWhereWithoutThreadsInputSchema: z.ZodType<Prisma.UserUpdateToOneWithWhereWithoutThreadsInput> =
  z.strictObject({
    where: z.lazy(() => UserWhereInputSchema).optional(),
    data: z.union([
      z.lazy(() => UserUpdateWithoutThreadsInputSchema),
      z.lazy(() => UserUncheckedUpdateWithoutThreadsInputSchema),
    ]),
  })

export const UserUpdateWithoutThreadsInputSchema: z.ZodType<Prisma.UserUpdateWithoutThreadsInput> =
  z.strictObject({
    id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    email: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    emailVerified: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    image: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    sessions: z
      .lazy(() => SessionUpdateManyWithoutUserNestedInputSchema)
      .optional(),
    accounts: z
      .lazy(() => AccountUpdateManyWithoutUserNestedInputSchema)
      .optional(),
  })

export const UserUncheckedUpdateWithoutThreadsInputSchema: z.ZodType<Prisma.UserUncheckedUpdateWithoutThreadsInput> =
  z.strictObject({
    id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    email: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    emailVerified: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    image: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    sessions: z
      .lazy(() => SessionUncheckedUpdateManyWithoutUserNestedInputSchema)
      .optional(),
    accounts: z
      .lazy(() => AccountUncheckedUpdateManyWithoutUserNestedInputSchema)
      .optional(),
  })

export const CategoryUpsertWithoutThreadsInputSchema: z.ZodType<Prisma.CategoryUpsertWithoutThreadsInput> =
  z.strictObject({
    update: z.union([
      z.lazy(() => CategoryUpdateWithoutThreadsInputSchema),
      z.lazy(() => CategoryUncheckedUpdateWithoutThreadsInputSchema),
    ]),
    create: z.union([
      z.lazy(() => CategoryCreateWithoutThreadsInputSchema),
      z.lazy(() => CategoryUncheckedCreateWithoutThreadsInputSchema),
    ]),
    where: z.lazy(() => CategoryWhereInputSchema).optional(),
  })

export const CategoryUpdateToOneWithWhereWithoutThreadsInputSchema: z.ZodType<Prisma.CategoryUpdateToOneWithWhereWithoutThreadsInput> =
  z.strictObject({
    where: z.lazy(() => CategoryWhereInputSchema).optional(),
    data: z.union([
      z.lazy(() => CategoryUpdateWithoutThreadsInputSchema),
      z.lazy(() => CategoryUncheckedUpdateWithoutThreadsInputSchema),
    ]),
  })

export const CategoryUpdateWithoutThreadsInputSchema: z.ZodType<Prisma.CategoryUpdateWithoutThreadsInput> =
  z.strictObject({
    id: z
      .union([z.cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    emoji: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
  })

export const CategoryUncheckedUpdateWithoutThreadsInputSchema: z.ZodType<Prisma.CategoryUncheckedUpdateWithoutThreadsInput> =
  z.strictObject({
    id: z
      .union([z.cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    name: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    emoji: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
  })

export const SessionCreateManyUserInputSchema: z.ZodType<Prisma.SessionCreateManyUserInput> =
  z.strictObject({
    id: z.string(),
    expiresAt: z.coerce.date(),
    token: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
    ipAddress: z.string().optional().nullable(),
    userAgent: z.string().optional().nullable(),
  })

export const AccountCreateManyUserInputSchema: z.ZodType<Prisma.AccountCreateManyUserInput> =
  z.strictObject({
    id: z.string(),
    accountId: z.string(),
    providerId: z.string(),
    accessToken: z.string().optional().nullable(),
    refreshToken: z.string().optional().nullable(),
    idToken: z.string().optional().nullable(),
    accessTokenExpiresAt: z.coerce.date().optional().nullable(),
    refreshTokenExpiresAt: z.coerce.date().optional().nullable(),
    scope: z.string().optional().nullable(),
    password: z.string().optional().nullable(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  })

export const ThreadCreateManyAuthorInputSchema: z.ZodType<Prisma.ThreadCreateManyAuthorInput> =
  z.strictObject({
    id: z.cuid().optional(),
    title: z.string(),
    brief: z.string(),
    content: z.string(),
    isFlagged: z.boolean().optional(),
    flagReason: z.string().optional().nullable(),
    categoryId: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  })

export const SessionUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUpdateWithoutUserInput> =
  z.strictObject({
    id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    expiresAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    token: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    ipAddress: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    userAgent: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
  })

export const SessionUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateWithoutUserInput> =
  z.strictObject({
    id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    expiresAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    token: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    ipAddress: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    userAgent: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
  })

export const SessionUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.SessionUncheckedUpdateManyWithoutUserInput> =
  z.strictObject({
    id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    expiresAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    token: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    ipAddress: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    userAgent: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
  })

export const AccountUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUpdateWithoutUserInput> =
  z.strictObject({
    id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    accountId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    providerId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    accessToken: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    refreshToken: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    idToken: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    accessTokenExpiresAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    refreshTokenExpiresAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    scope: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    password: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  })

export const AccountUncheckedUpdateWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateWithoutUserInput> =
  z.strictObject({
    id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    accountId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    providerId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    accessToken: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    refreshToken: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    idToken: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    accessTokenExpiresAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    refreshTokenExpiresAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    scope: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    password: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  })

export const AccountUncheckedUpdateManyWithoutUserInputSchema: z.ZodType<Prisma.AccountUncheckedUpdateManyWithoutUserInput> =
  z.strictObject({
    id: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    accountId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    providerId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    accessToken: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    refreshToken: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    idToken: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    accessTokenExpiresAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    refreshTokenExpiresAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => NullableDateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    scope: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    password: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  })

export const ThreadUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.ThreadUpdateWithoutAuthorInput> =
  z.strictObject({
    id: z
      .union([z.cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    title: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    brief: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    content: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    isFlagged: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    flagReason: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    Category: z
      .lazy(() => CategoryUpdateOneRequiredWithoutThreadsNestedInputSchema)
      .optional(),
  })

export const ThreadUncheckedUpdateWithoutAuthorInputSchema: z.ZodType<Prisma.ThreadUncheckedUpdateWithoutAuthorInput> =
  z.strictObject({
    id: z
      .union([z.cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    title: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    brief: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    content: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    isFlagged: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    flagReason: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    categoryId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  })

export const ThreadUncheckedUpdateManyWithoutAuthorInputSchema: z.ZodType<Prisma.ThreadUncheckedUpdateManyWithoutAuthorInput> =
  z.strictObject({
    id: z
      .union([z.cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    title: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    brief: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    content: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    isFlagged: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    flagReason: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    categoryId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  })

export const ThreadCreateManyCategoryInputSchema: z.ZodType<Prisma.ThreadCreateManyCategoryInput> =
  z.strictObject({
    id: z.cuid().optional(),
    title: z.string(),
    brief: z.string(),
    content: z.string(),
    isFlagged: z.boolean().optional(),
    flagReason: z.string().optional().nullable(),
    userId: z.string(),
    createdAt: z.coerce.date().optional(),
    updatedAt: z.coerce.date().optional(),
  })

export const ThreadUpdateWithoutCategoryInputSchema: z.ZodType<Prisma.ThreadUpdateWithoutCategoryInput> =
  z.strictObject({
    id: z
      .union([z.cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    title: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    brief: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    content: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    isFlagged: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    flagReason: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    author: z
      .lazy(() => UserUpdateOneRequiredWithoutThreadsNestedInputSchema)
      .optional(),
  })

export const ThreadUncheckedUpdateWithoutCategoryInputSchema: z.ZodType<Prisma.ThreadUncheckedUpdateWithoutCategoryInput> =
  z.strictObject({
    id: z
      .union([z.cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    title: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    brief: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    content: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    isFlagged: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    flagReason: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    userId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  })

export const ThreadUncheckedUpdateManyWithoutCategoryInputSchema: z.ZodType<Prisma.ThreadUncheckedUpdateManyWithoutCategoryInput> =
  z.strictObject({
    id: z
      .union([z.cuid(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    title: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    brief: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    content: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    isFlagged: z
      .union([z.boolean(), z.lazy(() => BoolFieldUpdateOperationsInputSchema)])
      .optional(),
    flagReason: z
      .union([
        z.string(),
        z.lazy(() => NullableStringFieldUpdateOperationsInputSchema),
      ])
      .optional()
      .nullable(),
    userId: z
      .union([z.string(), z.lazy(() => StringFieldUpdateOperationsInputSchema)])
      .optional(),
    createdAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
    updatedAt: z
      .union([
        z.coerce.date(),
        z.lazy(() => DateTimeFieldUpdateOperationsInputSchema),
      ])
      .optional(),
  })

/////////////////////////////////////////
// ARGS
/////////////////////////////////////////

export const UserFindFirstArgsSchema: z.ZodType<Prisma.UserFindFirstArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereInputSchema.optional(),
    orderBy: z
      .union([
        UserOrderByWithRelationInputSchema.array(),
        UserOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: UserWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict()

export const UserFindFirstOrThrowArgsSchema: z.ZodType<Prisma.UserFindFirstOrThrowArgs> =
  z
    .object({
      select: UserSelectSchema.optional(),
      include: UserIncludeSchema.optional(),
      where: UserWhereInputSchema.optional(),
      orderBy: z
        .union([
          UserOrderByWithRelationInputSchema.array(),
          UserOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: UserWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()])
        .optional(),
    })
    .strict()

export const UserFindManyArgsSchema: z.ZodType<Prisma.UserFindManyArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereInputSchema.optional(),
    orderBy: z
      .union([
        UserOrderByWithRelationInputSchema.array(),
        UserOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: UserWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([UserScalarFieldEnumSchema, UserScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict()

export const UserAggregateArgsSchema: z.ZodType<Prisma.UserAggregateArgs> = z
  .object({
    where: UserWhereInputSchema.optional(),
    orderBy: z
      .union([
        UserOrderByWithRelationInputSchema.array(),
        UserOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: UserWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict()

export const UserGroupByArgsSchema: z.ZodType<Prisma.UserGroupByArgs> = z
  .object({
    where: UserWhereInputSchema.optional(),
    orderBy: z
      .union([
        UserOrderByWithAggregationInputSchema.array(),
        UserOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: UserScalarFieldEnumSchema.array(),
    having: UserScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict()

export const UserFindUniqueArgsSchema: z.ZodType<Prisma.UserFindUniqueArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereUniqueInputSchema,
  })
  .strict()

export const UserFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.UserFindUniqueOrThrowArgs> =
  z
    .object({
      select: UserSelectSchema.optional(),
      include: UserIncludeSchema.optional(),
      where: UserWhereUniqueInputSchema,
    })
    .strict()

export const SessionFindFirstArgsSchema: z.ZodType<Prisma.SessionFindFirstArgs> =
  z
    .object({
      select: SessionSelectSchema.optional(),
      include: SessionIncludeSchema.optional(),
      where: SessionWhereInputSchema.optional(),
      orderBy: z
        .union([
          SessionOrderByWithRelationInputSchema.array(),
          SessionOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: SessionWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          SessionScalarFieldEnumSchema,
          SessionScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict()

export const SessionFindFirstOrThrowArgsSchema: z.ZodType<Prisma.SessionFindFirstOrThrowArgs> =
  z
    .object({
      select: SessionSelectSchema.optional(),
      include: SessionIncludeSchema.optional(),
      where: SessionWhereInputSchema.optional(),
      orderBy: z
        .union([
          SessionOrderByWithRelationInputSchema.array(),
          SessionOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: SessionWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          SessionScalarFieldEnumSchema,
          SessionScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict()

export const SessionFindManyArgsSchema: z.ZodType<Prisma.SessionFindManyArgs> =
  z
    .object({
      select: SessionSelectSchema.optional(),
      include: SessionIncludeSchema.optional(),
      where: SessionWhereInputSchema.optional(),
      orderBy: z
        .union([
          SessionOrderByWithRelationInputSchema.array(),
          SessionOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: SessionWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          SessionScalarFieldEnumSchema,
          SessionScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict()

export const SessionAggregateArgsSchema: z.ZodType<Prisma.SessionAggregateArgs> =
  z
    .object({
      where: SessionWhereInputSchema.optional(),
      orderBy: z
        .union([
          SessionOrderByWithRelationInputSchema.array(),
          SessionOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: SessionWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict()

export const SessionGroupByArgsSchema: z.ZodType<Prisma.SessionGroupByArgs> = z
  .object({
    where: SessionWhereInputSchema.optional(),
    orderBy: z
      .union([
        SessionOrderByWithAggregationInputSchema.array(),
        SessionOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: SessionScalarFieldEnumSchema.array(),
    having: SessionScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict()

export const SessionFindUniqueArgsSchema: z.ZodType<Prisma.SessionFindUniqueArgs> =
  z
    .object({
      select: SessionSelectSchema.optional(),
      include: SessionIncludeSchema.optional(),
      where: SessionWhereUniqueInputSchema,
    })
    .strict()

export const SessionFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.SessionFindUniqueOrThrowArgs> =
  z
    .object({
      select: SessionSelectSchema.optional(),
      include: SessionIncludeSchema.optional(),
      where: SessionWhereUniqueInputSchema,
    })
    .strict()

export const AccountFindFirstArgsSchema: z.ZodType<Prisma.AccountFindFirstArgs> =
  z
    .object({
      select: AccountSelectSchema.optional(),
      include: AccountIncludeSchema.optional(),
      where: AccountWhereInputSchema.optional(),
      orderBy: z
        .union([
          AccountOrderByWithRelationInputSchema.array(),
          AccountOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: AccountWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          AccountScalarFieldEnumSchema,
          AccountScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict()

export const AccountFindFirstOrThrowArgsSchema: z.ZodType<Prisma.AccountFindFirstOrThrowArgs> =
  z
    .object({
      select: AccountSelectSchema.optional(),
      include: AccountIncludeSchema.optional(),
      where: AccountWhereInputSchema.optional(),
      orderBy: z
        .union([
          AccountOrderByWithRelationInputSchema.array(),
          AccountOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: AccountWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          AccountScalarFieldEnumSchema,
          AccountScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict()

export const AccountFindManyArgsSchema: z.ZodType<Prisma.AccountFindManyArgs> =
  z
    .object({
      select: AccountSelectSchema.optional(),
      include: AccountIncludeSchema.optional(),
      where: AccountWhereInputSchema.optional(),
      orderBy: z
        .union([
          AccountOrderByWithRelationInputSchema.array(),
          AccountOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: AccountWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          AccountScalarFieldEnumSchema,
          AccountScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict()

export const AccountAggregateArgsSchema: z.ZodType<Prisma.AccountAggregateArgs> =
  z
    .object({
      where: AccountWhereInputSchema.optional(),
      orderBy: z
        .union([
          AccountOrderByWithRelationInputSchema.array(),
          AccountOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: AccountWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict()

export const AccountGroupByArgsSchema: z.ZodType<Prisma.AccountGroupByArgs> = z
  .object({
    where: AccountWhereInputSchema.optional(),
    orderBy: z
      .union([
        AccountOrderByWithAggregationInputSchema.array(),
        AccountOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: AccountScalarFieldEnumSchema.array(),
    having: AccountScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict()

export const AccountFindUniqueArgsSchema: z.ZodType<Prisma.AccountFindUniqueArgs> =
  z
    .object({
      select: AccountSelectSchema.optional(),
      include: AccountIncludeSchema.optional(),
      where: AccountWhereUniqueInputSchema,
    })
    .strict()

export const AccountFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.AccountFindUniqueOrThrowArgs> =
  z
    .object({
      select: AccountSelectSchema.optional(),
      include: AccountIncludeSchema.optional(),
      where: AccountWhereUniqueInputSchema,
    })
    .strict()

export const VerificationFindFirstArgsSchema: z.ZodType<Prisma.VerificationFindFirstArgs> =
  z
    .object({
      select: VerificationSelectSchema.optional(),
      where: VerificationWhereInputSchema.optional(),
      orderBy: z
        .union([
          VerificationOrderByWithRelationInputSchema.array(),
          VerificationOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: VerificationWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          VerificationScalarFieldEnumSchema,
          VerificationScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict()

export const VerificationFindFirstOrThrowArgsSchema: z.ZodType<Prisma.VerificationFindFirstOrThrowArgs> =
  z
    .object({
      select: VerificationSelectSchema.optional(),
      where: VerificationWhereInputSchema.optional(),
      orderBy: z
        .union([
          VerificationOrderByWithRelationInputSchema.array(),
          VerificationOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: VerificationWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          VerificationScalarFieldEnumSchema,
          VerificationScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict()

export const VerificationFindManyArgsSchema: z.ZodType<Prisma.VerificationFindManyArgs> =
  z
    .object({
      select: VerificationSelectSchema.optional(),
      where: VerificationWhereInputSchema.optional(),
      orderBy: z
        .union([
          VerificationOrderByWithRelationInputSchema.array(),
          VerificationOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: VerificationWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          VerificationScalarFieldEnumSchema,
          VerificationScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict()

export const VerificationAggregateArgsSchema: z.ZodType<Prisma.VerificationAggregateArgs> =
  z
    .object({
      where: VerificationWhereInputSchema.optional(),
      orderBy: z
        .union([
          VerificationOrderByWithRelationInputSchema.array(),
          VerificationOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: VerificationWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict()

export const VerificationGroupByArgsSchema: z.ZodType<Prisma.VerificationGroupByArgs> =
  z
    .object({
      where: VerificationWhereInputSchema.optional(),
      orderBy: z
        .union([
          VerificationOrderByWithAggregationInputSchema.array(),
          VerificationOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: VerificationScalarFieldEnumSchema.array(),
      having: VerificationScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict()

export const VerificationFindUniqueArgsSchema: z.ZodType<Prisma.VerificationFindUniqueArgs> =
  z
    .object({
      select: VerificationSelectSchema.optional(),
      where: VerificationWhereUniqueInputSchema,
    })
    .strict()

export const VerificationFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.VerificationFindUniqueOrThrowArgs> =
  z
    .object({
      select: VerificationSelectSchema.optional(),
      where: VerificationWhereUniqueInputSchema,
    })
    .strict()

export const CategoryFindFirstArgsSchema: z.ZodType<Prisma.CategoryFindFirstArgs> =
  z
    .object({
      select: CategorySelectSchema.optional(),
      include: CategoryIncludeSchema.optional(),
      where: CategoryWhereInputSchema.optional(),
      orderBy: z
        .union([
          CategoryOrderByWithRelationInputSchema.array(),
          CategoryOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: CategoryWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          CategoryScalarFieldEnumSchema,
          CategoryScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict()

export const CategoryFindFirstOrThrowArgsSchema: z.ZodType<Prisma.CategoryFindFirstOrThrowArgs> =
  z
    .object({
      select: CategorySelectSchema.optional(),
      include: CategoryIncludeSchema.optional(),
      where: CategoryWhereInputSchema.optional(),
      orderBy: z
        .union([
          CategoryOrderByWithRelationInputSchema.array(),
          CategoryOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: CategoryWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          CategoryScalarFieldEnumSchema,
          CategoryScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict()

export const CategoryFindManyArgsSchema: z.ZodType<Prisma.CategoryFindManyArgs> =
  z
    .object({
      select: CategorySelectSchema.optional(),
      include: CategoryIncludeSchema.optional(),
      where: CategoryWhereInputSchema.optional(),
      orderBy: z
        .union([
          CategoryOrderByWithRelationInputSchema.array(),
          CategoryOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: CategoryWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          CategoryScalarFieldEnumSchema,
          CategoryScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict()

export const CategoryAggregateArgsSchema: z.ZodType<Prisma.CategoryAggregateArgs> =
  z
    .object({
      where: CategoryWhereInputSchema.optional(),
      orderBy: z
        .union([
          CategoryOrderByWithRelationInputSchema.array(),
          CategoryOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: CategoryWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict()

export const CategoryGroupByArgsSchema: z.ZodType<Prisma.CategoryGroupByArgs> =
  z
    .object({
      where: CategoryWhereInputSchema.optional(),
      orderBy: z
        .union([
          CategoryOrderByWithAggregationInputSchema.array(),
          CategoryOrderByWithAggregationInputSchema,
        ])
        .optional(),
      by: CategoryScalarFieldEnumSchema.array(),
      having: CategoryScalarWhereWithAggregatesInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict()

export const CategoryFindUniqueArgsSchema: z.ZodType<Prisma.CategoryFindUniqueArgs> =
  z
    .object({
      select: CategorySelectSchema.optional(),
      include: CategoryIncludeSchema.optional(),
      where: CategoryWhereUniqueInputSchema,
    })
    .strict()

export const CategoryFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.CategoryFindUniqueOrThrowArgs> =
  z
    .object({
      select: CategorySelectSchema.optional(),
      include: CategoryIncludeSchema.optional(),
      where: CategoryWhereUniqueInputSchema,
    })
    .strict()

export const ThreadFindFirstArgsSchema: z.ZodType<Prisma.ThreadFindFirstArgs> =
  z
    .object({
      select: ThreadSelectSchema.optional(),
      include: ThreadIncludeSchema.optional(),
      where: ThreadWhereInputSchema.optional(),
      orderBy: z
        .union([
          ThreadOrderByWithRelationInputSchema.array(),
          ThreadOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: ThreadWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          ThreadScalarFieldEnumSchema,
          ThreadScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict()

export const ThreadFindFirstOrThrowArgsSchema: z.ZodType<Prisma.ThreadFindFirstOrThrowArgs> =
  z
    .object({
      select: ThreadSelectSchema.optional(),
      include: ThreadIncludeSchema.optional(),
      where: ThreadWhereInputSchema.optional(),
      orderBy: z
        .union([
          ThreadOrderByWithRelationInputSchema.array(),
          ThreadOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: ThreadWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
      distinct: z
        .union([
          ThreadScalarFieldEnumSchema,
          ThreadScalarFieldEnumSchema.array(),
        ])
        .optional(),
    })
    .strict()

export const ThreadFindManyArgsSchema: z.ZodType<Prisma.ThreadFindManyArgs> = z
  .object({
    select: ThreadSelectSchema.optional(),
    include: ThreadIncludeSchema.optional(),
    where: ThreadWhereInputSchema.optional(),
    orderBy: z
      .union([
        ThreadOrderByWithRelationInputSchema.array(),
        ThreadOrderByWithRelationInputSchema,
      ])
      .optional(),
    cursor: ThreadWhereUniqueInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    distinct: z
      .union([ThreadScalarFieldEnumSchema, ThreadScalarFieldEnumSchema.array()])
      .optional(),
  })
  .strict()

export const ThreadAggregateArgsSchema: z.ZodType<Prisma.ThreadAggregateArgs> =
  z
    .object({
      where: ThreadWhereInputSchema.optional(),
      orderBy: z
        .union([
          ThreadOrderByWithRelationInputSchema.array(),
          ThreadOrderByWithRelationInputSchema,
        ])
        .optional(),
      cursor: ThreadWhereUniqueInputSchema.optional(),
      take: z.number().optional(),
      skip: z.number().optional(),
    })
    .strict()

export const ThreadGroupByArgsSchema: z.ZodType<Prisma.ThreadGroupByArgs> = z
  .object({
    where: ThreadWhereInputSchema.optional(),
    orderBy: z
      .union([
        ThreadOrderByWithAggregationInputSchema.array(),
        ThreadOrderByWithAggregationInputSchema,
      ])
      .optional(),
    by: ThreadScalarFieldEnumSchema.array(),
    having: ThreadScalarWhereWithAggregatesInputSchema.optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
  })
  .strict()

export const ThreadFindUniqueArgsSchema: z.ZodType<Prisma.ThreadFindUniqueArgs> =
  z
    .object({
      select: ThreadSelectSchema.optional(),
      include: ThreadIncludeSchema.optional(),
      where: ThreadWhereUniqueInputSchema,
    })
    .strict()

export const ThreadFindUniqueOrThrowArgsSchema: z.ZodType<Prisma.ThreadFindUniqueOrThrowArgs> =
  z
    .object({
      select: ThreadSelectSchema.optional(),
      include: ThreadIncludeSchema.optional(),
      where: ThreadWhereUniqueInputSchema,
    })
    .strict()

export const UserCreateArgsSchema: z.ZodType<Prisma.UserCreateArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    data: z.union([UserCreateInputSchema, UserUncheckedCreateInputSchema]),
  })
  .strict()

export const UserUpsertArgsSchema: z.ZodType<Prisma.UserUpsertArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereUniqueInputSchema,
    create: z.union([UserCreateInputSchema, UserUncheckedCreateInputSchema]),
    update: z.union([UserUpdateInputSchema, UserUncheckedUpdateInputSchema]),
  })
  .strict()

export const UserCreateManyArgsSchema: z.ZodType<Prisma.UserCreateManyArgs> = z
  .object({
    data: z.union([
      UserCreateManyInputSchema,
      UserCreateManyInputSchema.array(),
    ]),
    skipDuplicates: z.boolean().optional(),
  })
  .strict()

export const UserCreateManyAndReturnArgsSchema: z.ZodType<Prisma.UserCreateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        UserCreateManyInputSchema,
        UserCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict()

export const UserDeleteArgsSchema: z.ZodType<Prisma.UserDeleteArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    where: UserWhereUniqueInputSchema,
  })
  .strict()

export const UserUpdateArgsSchema: z.ZodType<Prisma.UserUpdateArgs> = z
  .object({
    select: UserSelectSchema.optional(),
    include: UserIncludeSchema.optional(),
    data: z.union([UserUpdateInputSchema, UserUncheckedUpdateInputSchema]),
    where: UserWhereUniqueInputSchema,
  })
  .strict()

export const UserUpdateManyArgsSchema: z.ZodType<Prisma.UserUpdateManyArgs> = z
  .object({
    data: z.union([
      UserUpdateManyMutationInputSchema,
      UserUncheckedUpdateManyInputSchema,
    ]),
    where: UserWhereInputSchema.optional(),
    limit: z.number().optional(),
  })
  .strict()

export const UserUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.UserUpdateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        UserUpdateManyMutationInputSchema,
        UserUncheckedUpdateManyInputSchema,
      ]),
      where: UserWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict()

export const UserDeleteManyArgsSchema: z.ZodType<Prisma.UserDeleteManyArgs> = z
  .object({
    where: UserWhereInputSchema.optional(),
    limit: z.number().optional(),
  })
  .strict()

export const SessionCreateArgsSchema: z.ZodType<Prisma.SessionCreateArgs> = z
  .object({
    select: SessionSelectSchema.optional(),
    include: SessionIncludeSchema.optional(),
    data: z.union([
      SessionCreateInputSchema,
      SessionUncheckedCreateInputSchema,
    ]),
  })
  .strict()

export const SessionUpsertArgsSchema: z.ZodType<Prisma.SessionUpsertArgs> = z
  .object({
    select: SessionSelectSchema.optional(),
    include: SessionIncludeSchema.optional(),
    where: SessionWhereUniqueInputSchema,
    create: z.union([
      SessionCreateInputSchema,
      SessionUncheckedCreateInputSchema,
    ]),
    update: z.union([
      SessionUpdateInputSchema,
      SessionUncheckedUpdateInputSchema,
    ]),
  })
  .strict()

export const SessionCreateManyArgsSchema: z.ZodType<Prisma.SessionCreateManyArgs> =
  z
    .object({
      data: z.union([
        SessionCreateManyInputSchema,
        SessionCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict()

export const SessionCreateManyAndReturnArgsSchema: z.ZodType<Prisma.SessionCreateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        SessionCreateManyInputSchema,
        SessionCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict()

export const SessionDeleteArgsSchema: z.ZodType<Prisma.SessionDeleteArgs> = z
  .object({
    select: SessionSelectSchema.optional(),
    include: SessionIncludeSchema.optional(),
    where: SessionWhereUniqueInputSchema,
  })
  .strict()

export const SessionUpdateArgsSchema: z.ZodType<Prisma.SessionUpdateArgs> = z
  .object({
    select: SessionSelectSchema.optional(),
    include: SessionIncludeSchema.optional(),
    data: z.union([
      SessionUpdateInputSchema,
      SessionUncheckedUpdateInputSchema,
    ]),
    where: SessionWhereUniqueInputSchema,
  })
  .strict()

export const SessionUpdateManyArgsSchema: z.ZodType<Prisma.SessionUpdateManyArgs> =
  z
    .object({
      data: z.union([
        SessionUpdateManyMutationInputSchema,
        SessionUncheckedUpdateManyInputSchema,
      ]),
      where: SessionWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict()

export const SessionUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.SessionUpdateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        SessionUpdateManyMutationInputSchema,
        SessionUncheckedUpdateManyInputSchema,
      ]),
      where: SessionWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict()

export const SessionDeleteManyArgsSchema: z.ZodType<Prisma.SessionDeleteManyArgs> =
  z
    .object({
      where: SessionWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict()

export const AccountCreateArgsSchema: z.ZodType<Prisma.AccountCreateArgs> = z
  .object({
    select: AccountSelectSchema.optional(),
    include: AccountIncludeSchema.optional(),
    data: z.union([
      AccountCreateInputSchema,
      AccountUncheckedCreateInputSchema,
    ]),
  })
  .strict()

export const AccountUpsertArgsSchema: z.ZodType<Prisma.AccountUpsertArgs> = z
  .object({
    select: AccountSelectSchema.optional(),
    include: AccountIncludeSchema.optional(),
    where: AccountWhereUniqueInputSchema,
    create: z.union([
      AccountCreateInputSchema,
      AccountUncheckedCreateInputSchema,
    ]),
    update: z.union([
      AccountUpdateInputSchema,
      AccountUncheckedUpdateInputSchema,
    ]),
  })
  .strict()

export const AccountCreateManyArgsSchema: z.ZodType<Prisma.AccountCreateManyArgs> =
  z
    .object({
      data: z.union([
        AccountCreateManyInputSchema,
        AccountCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict()

export const AccountCreateManyAndReturnArgsSchema: z.ZodType<Prisma.AccountCreateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        AccountCreateManyInputSchema,
        AccountCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict()

export const AccountDeleteArgsSchema: z.ZodType<Prisma.AccountDeleteArgs> = z
  .object({
    select: AccountSelectSchema.optional(),
    include: AccountIncludeSchema.optional(),
    where: AccountWhereUniqueInputSchema,
  })
  .strict()

export const AccountUpdateArgsSchema: z.ZodType<Prisma.AccountUpdateArgs> = z
  .object({
    select: AccountSelectSchema.optional(),
    include: AccountIncludeSchema.optional(),
    data: z.union([
      AccountUpdateInputSchema,
      AccountUncheckedUpdateInputSchema,
    ]),
    where: AccountWhereUniqueInputSchema,
  })
  .strict()

export const AccountUpdateManyArgsSchema: z.ZodType<Prisma.AccountUpdateManyArgs> =
  z
    .object({
      data: z.union([
        AccountUpdateManyMutationInputSchema,
        AccountUncheckedUpdateManyInputSchema,
      ]),
      where: AccountWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict()

export const AccountUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.AccountUpdateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        AccountUpdateManyMutationInputSchema,
        AccountUncheckedUpdateManyInputSchema,
      ]),
      where: AccountWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict()

export const AccountDeleteManyArgsSchema: z.ZodType<Prisma.AccountDeleteManyArgs> =
  z
    .object({
      where: AccountWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict()

export const VerificationCreateArgsSchema: z.ZodType<Prisma.VerificationCreateArgs> =
  z
    .object({
      select: VerificationSelectSchema.optional(),
      data: z.union([
        VerificationCreateInputSchema,
        VerificationUncheckedCreateInputSchema,
      ]),
    })
    .strict()

export const VerificationUpsertArgsSchema: z.ZodType<Prisma.VerificationUpsertArgs> =
  z
    .object({
      select: VerificationSelectSchema.optional(),
      where: VerificationWhereUniqueInputSchema,
      create: z.union([
        VerificationCreateInputSchema,
        VerificationUncheckedCreateInputSchema,
      ]),
      update: z.union([
        VerificationUpdateInputSchema,
        VerificationUncheckedUpdateInputSchema,
      ]),
    })
    .strict()

export const VerificationCreateManyArgsSchema: z.ZodType<Prisma.VerificationCreateManyArgs> =
  z
    .object({
      data: z.union([
        VerificationCreateManyInputSchema,
        VerificationCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict()

export const VerificationCreateManyAndReturnArgsSchema: z.ZodType<Prisma.VerificationCreateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        VerificationCreateManyInputSchema,
        VerificationCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict()

export const VerificationDeleteArgsSchema: z.ZodType<Prisma.VerificationDeleteArgs> =
  z
    .object({
      select: VerificationSelectSchema.optional(),
      where: VerificationWhereUniqueInputSchema,
    })
    .strict()

export const VerificationUpdateArgsSchema: z.ZodType<Prisma.VerificationUpdateArgs> =
  z
    .object({
      select: VerificationSelectSchema.optional(),
      data: z.union([
        VerificationUpdateInputSchema,
        VerificationUncheckedUpdateInputSchema,
      ]),
      where: VerificationWhereUniqueInputSchema,
    })
    .strict()

export const VerificationUpdateManyArgsSchema: z.ZodType<Prisma.VerificationUpdateManyArgs> =
  z
    .object({
      data: z.union([
        VerificationUpdateManyMutationInputSchema,
        VerificationUncheckedUpdateManyInputSchema,
      ]),
      where: VerificationWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict()

export const VerificationUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.VerificationUpdateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        VerificationUpdateManyMutationInputSchema,
        VerificationUncheckedUpdateManyInputSchema,
      ]),
      where: VerificationWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict()

export const VerificationDeleteManyArgsSchema: z.ZodType<Prisma.VerificationDeleteManyArgs> =
  z
    .object({
      where: VerificationWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict()

export const CategoryCreateArgsSchema: z.ZodType<Prisma.CategoryCreateArgs> = z
  .object({
    select: CategorySelectSchema.optional(),
    include: CategoryIncludeSchema.optional(),
    data: z.union([
      CategoryCreateInputSchema,
      CategoryUncheckedCreateInputSchema,
    ]),
  })
  .strict()

export const CategoryUpsertArgsSchema: z.ZodType<Prisma.CategoryUpsertArgs> = z
  .object({
    select: CategorySelectSchema.optional(),
    include: CategoryIncludeSchema.optional(),
    where: CategoryWhereUniqueInputSchema,
    create: z.union([
      CategoryCreateInputSchema,
      CategoryUncheckedCreateInputSchema,
    ]),
    update: z.union([
      CategoryUpdateInputSchema,
      CategoryUncheckedUpdateInputSchema,
    ]),
  })
  .strict()

export const CategoryCreateManyArgsSchema: z.ZodType<Prisma.CategoryCreateManyArgs> =
  z
    .object({
      data: z.union([
        CategoryCreateManyInputSchema,
        CategoryCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict()

export const CategoryCreateManyAndReturnArgsSchema: z.ZodType<Prisma.CategoryCreateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        CategoryCreateManyInputSchema,
        CategoryCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict()

export const CategoryDeleteArgsSchema: z.ZodType<Prisma.CategoryDeleteArgs> = z
  .object({
    select: CategorySelectSchema.optional(),
    include: CategoryIncludeSchema.optional(),
    where: CategoryWhereUniqueInputSchema,
  })
  .strict()

export const CategoryUpdateArgsSchema: z.ZodType<Prisma.CategoryUpdateArgs> = z
  .object({
    select: CategorySelectSchema.optional(),
    include: CategoryIncludeSchema.optional(),
    data: z.union([
      CategoryUpdateInputSchema,
      CategoryUncheckedUpdateInputSchema,
    ]),
    where: CategoryWhereUniqueInputSchema,
  })
  .strict()

export const CategoryUpdateManyArgsSchema: z.ZodType<Prisma.CategoryUpdateManyArgs> =
  z
    .object({
      data: z.union([
        CategoryUpdateManyMutationInputSchema,
        CategoryUncheckedUpdateManyInputSchema,
      ]),
      where: CategoryWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict()

export const CategoryUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.CategoryUpdateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        CategoryUpdateManyMutationInputSchema,
        CategoryUncheckedUpdateManyInputSchema,
      ]),
      where: CategoryWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict()

export const CategoryDeleteManyArgsSchema: z.ZodType<Prisma.CategoryDeleteManyArgs> =
  z
    .object({
      where: CategoryWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict()

export const ThreadCreateArgsSchema: z.ZodType<Prisma.ThreadCreateArgs> = z
  .object({
    select: ThreadSelectSchema.optional(),
    include: ThreadIncludeSchema.optional(),
    data: z.union([ThreadCreateInputSchema, ThreadUncheckedCreateInputSchema]),
  })
  .strict()

export const ThreadUpsertArgsSchema: z.ZodType<Prisma.ThreadUpsertArgs> = z
  .object({
    select: ThreadSelectSchema.optional(),
    include: ThreadIncludeSchema.optional(),
    where: ThreadWhereUniqueInputSchema,
    create: z.union([
      ThreadCreateInputSchema,
      ThreadUncheckedCreateInputSchema,
    ]),
    update: z.union([
      ThreadUpdateInputSchema,
      ThreadUncheckedUpdateInputSchema,
    ]),
  })
  .strict()

export const ThreadCreateManyArgsSchema: z.ZodType<Prisma.ThreadCreateManyArgs> =
  z
    .object({
      data: z.union([
        ThreadCreateManyInputSchema,
        ThreadCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict()

export const ThreadCreateManyAndReturnArgsSchema: z.ZodType<Prisma.ThreadCreateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        ThreadCreateManyInputSchema,
        ThreadCreateManyInputSchema.array(),
      ]),
      skipDuplicates: z.boolean().optional(),
    })
    .strict()

export const ThreadDeleteArgsSchema: z.ZodType<Prisma.ThreadDeleteArgs> = z
  .object({
    select: ThreadSelectSchema.optional(),
    include: ThreadIncludeSchema.optional(),
    where: ThreadWhereUniqueInputSchema,
  })
  .strict()

export const ThreadUpdateArgsSchema: z.ZodType<Prisma.ThreadUpdateArgs> = z
  .object({
    select: ThreadSelectSchema.optional(),
    include: ThreadIncludeSchema.optional(),
    data: z.union([ThreadUpdateInputSchema, ThreadUncheckedUpdateInputSchema]),
    where: ThreadWhereUniqueInputSchema,
  })
  .strict()

export const ThreadUpdateManyArgsSchema: z.ZodType<Prisma.ThreadUpdateManyArgs> =
  z
    .object({
      data: z.union([
        ThreadUpdateManyMutationInputSchema,
        ThreadUncheckedUpdateManyInputSchema,
      ]),
      where: ThreadWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict()

export const ThreadUpdateManyAndReturnArgsSchema: z.ZodType<Prisma.ThreadUpdateManyAndReturnArgs> =
  z
    .object({
      data: z.union([
        ThreadUpdateManyMutationInputSchema,
        ThreadUncheckedUpdateManyInputSchema,
      ]),
      where: ThreadWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict()

export const ThreadDeleteManyArgsSchema: z.ZodType<Prisma.ThreadDeleteManyArgs> =
  z
    .object({
      where: ThreadWhereInputSchema.optional(),
      limit: z.number().optional(),
    })
    .strict()
