<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     *
     * @return void
     */
    public function register()
    {
        $this->reportable(function (Throwable $e) {
            //
        });
    }

    /**
     * Report or log an exception.
     *
     * @param  \Exception  $exception
     * @return void
     *
     * @throws \Exception
     */
    public function report(Throwable $exception)
    {
        parent::report($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Exception  $exception
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @throws \Exception
     */
    public function render($request, Throwable $exception)
    {

        dd($exception);

        if (method_exists($exception, 'getStatusCode')) {

            switch ($exception->getStatusCode()) {
                case 500:
                    return parent::render($request, $exception);

                case 404:
                    return parent::render($request, $exception);

                case 422:
                    return response()->json([
                        'error'   => $exception->getStatusCode(),
                        'message' => $exception->getMessage(),
                    ], 422);

                default:
                    return parent::render($request, $exception);
            }
        }

        if (method_exists($exception, 'getCode')) {
            if ($exception->getCode() == 0) {
                return response()->json([
                    'error'   => 500,
                    'message' => $exception->getMessage(),
                    'file'    => $exception->getFile(),
                    'line'    => $exception->getLine(),
                    'trace'   => $exception->getTrace()[0],
                ], 500);
            }
        }

        return parent::render($request, $exception);
    }
}
