export async function GET(req) {
    try {
        await verifyAdmin(req);

        const users = await User.find();

        return NextResponse.json({
            success: true,
            data: users,
        });
    } catch (error) {
        return NextResponse.json(
            {
                success: false,
                message: error.message,
            },
            { status: 403 }
        );
    }
}