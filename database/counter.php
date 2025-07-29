<?php
    $file = 'visitors.txt';

    // Check if the file exists, if not create it
    if (!file_exists($file)) {
        file_put_contents($file, 0);
    }

    // Read the current visitor count from the file
    $count = (int)file_get_contents($file);

    // Increment the visitor count by one
    $count++;

    // Write the new visitor count to the file
    file_put_contents($file, $count);

    // Send the visitor count as the response
    echo $count;
?>