import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const InsertSelectedAssistants=mutation({
    args:{
        records:v.any(),
        uid:v.id('users')
    },
    handler:async(ctx,args)=>{
        const insertedIds=await Promise.all(
            args.records.map(async(record:any)=>
            await ctx.db.insert('userAiAssistants',{
                ...record,
                aiModelId:'Google: Gemini 2.0 Flash',
                uid:args.uid
            })
            )
        );
        return insertedIds;
    }
})

export const GetAllUserAssistants=query({
    args:{
        uid:v.id('users')
    },
    handler:async(ctx,args)=>{
        const result = await ctx.db.query('userAiAssistants')
        .filter(q=>q.eq(q.field('uid'),args.uid))
        .collect();

        return result;
    }

})

export const UpdateUserAiAssistant = mutation({
    args: {
      id: v.id('userAiAssistants'),
      userInstruction: v.string(),
      aiModelId: v.optional(v.string()), // ✅ make it optional
    },
    handler: async (ctx, args) => {
      const updateData: Record<string, any> = {
        userInstruction: args.userInstruction,
      };
  
      if (args.aiModelId) {
        updateData.aiModelId = args.aiModelId;
      }
  
      return await ctx.db.patch(args.id, updateData);
    },
  });

  export const DeleteAssistant = mutation({
    args:{
      id:v.id('userAiAssistants')
    },
    handler:async(ctx,args) =>{
      await ctx.db.delete(args.id);
    }
  })
  