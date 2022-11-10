echo "Waiting for DynamoDB container to start..."
until [ "`docker inspect -f {{.State.Running}} dynamodb`"=="true" ]; do
    sleep 0.1;
done;
echo "DynamoDB emulator container started!"
